/*
 * qa_evaluator.js
 *
 * Loops through a JSON array of { question, answer } pairs,
 * sends each question to the locally hosted AI API endpoint with streaming,
 * collects and combines all message chunks into a single reply via Node.js streams,
 * implements retry logic on failures,
 * writes incremental results after each question, and computes a confidence score (0.0–1.0)
 * by comparing it to the reference answer.
 *
 * Usage:
 *   1. Install dependencies: npm install node-fetch string-similarity
 *   2. Ensure package.json has "type": "module" or convert imports to CommonJS.
 *   3. Optionally, pass path to JSON file as first argument (defaults to './qa_pairs.json').
 *   4. Run: node qa_evaluator.js [path/to/qa_pairs.json]
 */

import fs from 'fs';
import fetch from 'node-fetch';
import { compareTwoStrings } from 'string-similarity';

// ----- Configuration -----
const AI_ENDPOINT   = 'http://localhost:8000/chat/30550';
const DEFAULT_INPUT = './qa_pairs.json';
const OUTPUT_FILE   = './evaluation_results.json';
const MAX_RETRIES   = 3;
const RETRY_DELAY   = 1000; // milliseconds

// Use first CLI arg as input file if provided
const INPUT_FILE = process.argv[2] || DEFAULT_INPUT;

// ----- Helper: delay -----
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ----- Helper: send question with retries -----
async function askAIWithRetry(question) {
  let attempt = 0;
  let delayMs = RETRY_DELAY;
  while (attempt < MAX_RETRIES) {
    try {
      return await askAI(question);
    } catch (err) {
      attempt++;
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt >= MAX_RETRIES) {
        console.error(`Max retries reached for question: "${question}"`);
        throw err;
      }
      console.log(`Retrying in ${delayMs}ms...`);
      await delay(delayMs);
      delayMs *= 2;
    }
  }
}

// ----- Helper: send question and collect streaming response using Node streams -----
async function askAI(question) {
  const payload = {
    user_id:         '-999',
    conversation_id: '-999',
    message:         question,
    prompt_name:     'default',
    input: {
      additionalProp1: 'string',
      additionalProp2: 'string',
      additionalProp3: 'string'
    }
  };

  const res = await fetch(AI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return new Promise((resolve, reject) => {
    const stream = res.body;
    let buffer = '';
    let combined = '';

    stream.on('data', chunk => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop(); // last partial line
      for (const line of lines) {
        if (!line.trim()) continue;
        let chunkObj;
        try {
          chunkObj = JSON.parse(line);
        } catch {
          continue;
        }
        if (chunkObj.message) {
          combined += chunkObj.message;
        }
        if (chunkObj.status === 'answered') {
          stream.destroy();
          return resolve(combined.trim());
        }
      }
    });

    stream.on('end', () => resolve(combined.trim()));
    stream.on('error', err => reject(err));
  });
}

// ----- Main loop -----
(async function main() {
  try {
    if (!fs.existsSync(INPUT_FILE)) {
      console.error(`Error: Input file not found at '${INPUT_FILE}'.`);
      process.exit(1);
    }
    const raw = fs.readFileSync(INPUT_FILE, 'utf-8');
    const pairs = JSON.parse(raw);
    if (!Array.isArray(pairs)) {
      console.error(`Error: Expected an array of { question, answer } pairs in '${INPUT_FILE}'.`);
      process.exit(1);
    }

    const results = [];
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));

    for (const { question, answer: reference } of pairs) {
      console.log(`\nAsking: ${question}`);
      let reply;
      let confidence = 0;
      try {
        reply = await askAIWithRetry(question);
        console.log(`AI replied: ${reply}`);
        confidence = compareTwoStrings(reply, reference);
      } catch (err) {
        reply = `ERROR: ${err.message}`;
        console.error(`Failed to get a valid reply for question: "${question}"`);
      }
      console.log(`Reference : ${reference}`);
      console.log(`Confidence: ${confidence.toFixed(3)}`);
      results.push({ question, reference, reply, confidence });
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    }

    console.log(`\nAll done! Results saved incrementally to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
