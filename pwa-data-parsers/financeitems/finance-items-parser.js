const fs = require('fs');
const TurndownService = require('turndown');
const yaml = require('js-yaml');

const jsonData = require('./financeitems.json'); // Replace with your actual file
const outputFile = 'seed_finance_items.sql';
const turndownService = new TurndownService();

export class TextRank {
	graph = new Map();
	edges = new Map();
	nodes = new Map();
	weights = new Map();

	score = 0.15;
	damping = 0.85;
	convergence = 0.01;

	addEdge(from, to, weight = 1.0) {
		if (from === to) return;
		this.addNode(from, to);
		this.addWeight(from, to, weight);
		this.incrementEdge(from);
	}

	addNode(from, to) {
		if (!this.graph.has(to)) {
			this.graph.set(to, new Set([from]));
		} else {
			if (!this.graph.get(to)) {
				this.graph.get(to).add(from)
			} 
		}

		this.nodes.set(from, this.score);
		this.nodes.set(to, this.score);
	}

	addWeight(from, to, weight) {
		if (!this.weights.has(from)) {
			this.weights.set(from, new Map());
		}
		const fromWeights = this.weights.get(from);
		if (fromWeights) {
			fromWeights.set(to, weight);
		}
	}

	incrementEdge(from) {
		this.edges.set(from, (this.edges.get(from) || 0) + 1);
	}

	execute() {
		let current = new Map(this.nodes);
		let next = this.iterate(current);

		while (!this.isConverged(current, next)) {
			current = next;
			next = this.iterate(current);
		}

		this.nodes = next;
		return next;
	}

	iterate(nodes){
		const result = new Map();

		for (const [node, fromNodes] of this.graph.entries()) {
			let score = 0;

			for (const from of fromNodes) {
				const fromScore = nodes.get(from) ?? 0;
				const edgeCount = this.edges.get(from) ?? 1;
				const weight = this.weights.get(from)?.get(node) ?? 0;
				score += fromScore / edgeCount * weight;
			}

			const n = nodes.size || 1;
			result.set(node, (1 - this.damping / n) + this.damping * score);
		}

		return result;
	}

	isConverged(oldNodes, newNodes) {
		let sum = 0;
		for (const key of newNodes.keys()) {
			const diff = (newNodes.get(key) ?? 0) - (oldNodes.get(key) ?? 0);
			sum += diff * diff;
		}

		const meanSquareDiff = sum / (newNodes.size || 1);
		return Math.sqrt(meanSquareDiff) < this.convergence;
	}
}

export class KeywordDescriptor {
    keywords;

    constructor(text) {
        const words = this.getWords(text);
        const rank = this.getRank(words);

        // Execute TextRank and sort results
        this.keywords = [...rank.execute().entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([word]) => word);
    }

    getWords(text) {
        const cleanedText = removeHTMLTags(text)
            .toLowerCase()
            .replace(/[^a-z\s]/g, ' ');

        return cleanedText
            .split(/\s+/)
            .filter(w => w.length > 2 && !KeywordDescriptor.invalidWords.has(w));
    }

    getRank(words) {
        const rank = new TextRank();
        const windowSize = 3;

        for (let i = 0; i < words.length; i++) {
            const from = words[i];
            const context = words.slice(
                Math.max(0, i - windowSize),
                Math.min(words.length, i + windowSize + 1)
            );

            for (const to of context) {
                if (from !== to) {
                    rank.addEdge(from, to);
                }
            }
        }

        return rank;
    }

    static invalidWords = new Set([
        "aboard",
        "about",
        "above",
        "absent",
        "absolutely",
        "across",
        "actually",
        "after",
        "again",
        "against",
        "ago",
        "ahead",
        "all",
        "almost",
        "alone",
        "along",
        "alongside",
        "already",
        "also",
        "always",
        "amid",
        "amidst",
        "among",
        "amongst",
        "and",
        "another",
        "any",
        "anybody",
        "anyone",
        "anything",
        "are",
        "around",
        "as",
        "astride",
        "at",
        "atop",
        "available",
        "away",
        "back",
        "bar",
        "before",
        "behind",
        "below",
        "beneath",
        "beside",
        "besides",
        "best",
        "better",
        "between",
        "beyond",
        "both",
        "but",
        "by",
        "can",
        "cant",
        "car",
        "cars",
        "certainly",
        "circa",
        "clearly",
        "close",
        "come",
        "despite",
        "did",
        "didnt",
        "directly",
        "does",
        "doesnt",
        "down",
        "during",
        "each",
        "early",
        "eight",
        "either",
        "eleven",
        "else",
        "enough",
        "especially",
        "even",
        "eventually",
        "ever",
        "everybody",
        "everyone",
        "everything",
        "exactly",
        "except",
        "far",
        "fast",
        "few",
        "finally",
        "five",
        "for",
        "forward",
        "four",
        "from",
        "get",
        "got",
        "hard",
        "has",
        "have",
        "he",
        "her",
        "here",
        "hers",
        "herself",
        "him",
        "himself",
        "his",
        "home",
        "how",
        "however",
        "I",
        "in",
        "indeed",
        "inside",
        "instead",
        "into",
        "it",
        "its",
        "itself",
        "just",
        "keep",
        "later",
        "least",
        "less",
        "lets",
        "like",
        "little",
        "long",
        "many",
        "maybe",
        "me",
        "mine",
        "minus",
        "more",
        "most",
        "much",
        "must",
        "my",
        "myself",
        "near",
        "nearly",
        "necessary",
        "need",
        "neither",
        "never",
        "nine",
        "no",
        "nobody",
        "none",
        "noone",
        "nor",
        "not",
        "nothing",
        "notwithstanding",
        "now",
        "of",
        "off",
        "often",
        "ok",
        "on",
        "once",
        "one",
        "only",
        "onto",
        "opposite",
        "or",
        "other",
        "others",
        "our",
        "ours",
        "ourselves",
        "out",
        "outside",
        "over",
        "particularly",
        "past",
        "per",
        "perhaps",
        "please",
        "plus",
        "post ",
        "pre ",
        "pretty",
        "pro ",
        "probably",
        "put",
        "puts",
        "quickly",
        "quite",
        "rather",
        "re",
        "really",
        "recently",
        "refer",
        "refers",
        "right",
        "sans",
        "save",
        "seven",
        "several",
        "she",
        "short",
        "simply",
        "since",
        "six",
        "so",
        "some",
        "somebody",
        "someone",
        "something",
        "sometimes",
        "soon",
        "still",
        "such",
        "suddenly",
        "system",
        "take",
        "ten",
        "tell",
        "tells",
        "than",
        "that",
        "the",
        "thee",
        "their",
        "theirs",
        "them",
        "themselves",
        "then",
        "there",
        "therefore",
        "these",
        "they",
        "thine",
        "this",
        "those",
        "thou",
        "three",
        "through",
        "throughout",
        "thus",
        "thy",
        "till",
        "to",
        "today",
        "together",
        "tonight",
        "too",
        "toward",
        "towards",
        "twelve",
        "two",
        "under",
        "underneath",
        "unlike",
        "unnecessary",
        "until",
        "unto",
        "up",
        "upon",
        "upside",
        "us",
        "use",
        "usually",
        "vehicle",
        "versus",
        "very",
        "via",
        "vice",
        "volkswagen",
        "was",
        "we",
        "website",
        "well",
        "what",
        "whatever",
        "when",
        "where",
        "which",
        "whichever",
        "who",
        "whoever",
        "whom",
        "whomever",
        "whose",
        "why",
        "will",
        "with",
        "within",
        "without",
        "wont",
        "worth",
        "yet",
        "you",
        "your",
        "yours",
        "yourself",
        "yourselves",
        "zero"
    ]);
}

export function removeHTMLTags(input) {
    return input.includes('<') ? input.replace(/<[^>]*>/g, '') : input;
}

export default KeywordDescriptor;


// SQL text sanitizer
function sanitize(text) {
  return text ? text.replace(/'/g, "''") : '';
}

// Generate SQL
function generateSQL(items) {
  let sql = '\n-- Insert data into knowledge_hub_items (Finance Items)\n';

  items.forEach((item) => {
    const title = sanitize(item.title);
    const subtitle = sanitize(item.subtitle);
    const landscape = sanitize(item.landscapeImageFileName || '');
    // YAML front matter for content

    // YAML front matter for content
    let content = `---\n`;
    content += yaml.dump({
      assets: [
        {
          id: 1,
          imageFileName:
            'https://showroom-assets.volkswagen.co.uk/images/' +
            item.landscapeImageFileName,
          thumbnailImageFileName:
            'https://showroom-assets.volkswagen.co.uk/images/' +
            item.portraitImageFileName,
          assetFileName:
            'https://showroom-assets.volkswagen.co.uk/videos/' +
            item.assetFileName,
        },
      ],
    });
    content += `---\n\n`;

    // Add main body text (converted to Markdown)
    const bodyText = item.text ? turndownService.turndown(item.text) : '';
    content += sanitize(bodyText);

    // Get keywords
    const descriptor = new KeywordDescriptor(combinedText);
		const keywords = descriptor.keywords.slice(0, 10);

    // Insert statement
    sql += `INSERT INTO knowledge_hub_items (name, short_description, primary_image, content, category, popularity, featured, tags)\n`;
    sql += `SELECT '${title}', '${subtitle}', '${'https://showroom-assets.volkswagen.co.uk/images/' + landscape}', '${content}',\n`;
    sql += `  (SELECT id FROM knowledge_hub_categories WHERE LOWER(name) = LOWER('finance') LIMIT 1), 0, false, ${keywords} \n`;
    sql += `WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${title}'));\n\n`;
  });

  return sql;
}

// Run it
const sqlCommands = generateSQL(jsonData);
fs.writeFileSync(outputFile, sqlCommands, 'utf8');
console.log(`SQL seed commands file saved to ${outputFile}`);
