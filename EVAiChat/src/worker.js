
/////////////////////////////////////////////////////////////////
// Worker.js file for doing all transformer-based computations //
// Needed to ensure the UI thread is not blocked when running  //
/////////////////////////////////////////////////////////////////


import { pipeline, env } from "@xenova/transformers";
env.allowLocalModels = true;
const HF_TOKEN = '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';

// Define task function mapping
const TASK_FUNCTION_MAPPING = {
    'question-answering': question_answering
}

// Listen for messages from UI
self.addEventListener('message', async (event) => {
    const data = event.data;
    let fn = TASK_FUNCTION_MAPPING[data.task];

    if (!fn) return;

    let result = await fn(data);
    self.postMessage({
        task: data.task,
        type: 'result',
        data: result
    });
});

// Define model factories
// Ensures only one model is created of each type
class PipelineFactory {
    static task = null;
    static model = null;

    // NOTE: instance stores a promise that resolves to the pipeline
    static instance = null;

    constructor(tokenizer, model) {
        this.tokenizer = tokenizer;
        this.model = model;
    }

    /**
     * Get pipeline instance
     * @param {*} progressCallback 
     * @returns {Promise}
     */
    static getInstance(progressCallback = null) {
        if (this.task === null || this.model === null) {
            throw Error("Must set task and model")
        }
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, {
                progress_callback: progressCallback
            });
        }

        return this.instance;
    }
}

class QuestionAnsweringPipelineFactory extends PipelineFactory {
    static task = 'question-answering';
    static model = 'Xenova/distilbert-base-cased-distilled-squad';
}

async function question_answering(data) {
    let pipeline = await QuestionAnsweringPipelineFactory.getInstance(data => {
        self.postMessage({
            type: 'download',
            task: 'question-answering',
            data: data
        });
    })

    let answer = await pipeline(data.question, data.context)
    self.postMessage({
        type: 'complete',
        target: data.elementIdToUpdate,
        data: answer.answer
    });

    return answer;
}