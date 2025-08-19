const fs = require('fs');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');
const yaml = require('js-yaml');

const jsonData = require('./technologyitems.json'); // Load JSON data
const outputFile = 'seed_commands.sql';
const turndownService = new TurndownService();

class TextRank {
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

class KeywordDescriptor {
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

function removeHTMLTags(input) {
    return input.includes('<') ? input.replace(/<[^>]*>/g, '') : input;
}

const categoryMapping = {
    'efficient technologies': 1,
    'performance': 2,
    'safety': 3,
    'comfort features': 4,
    'entertainment': 5,
    'id. technologies': 6,
    'mobile online services': 7,
    'accessories': 8,
    'id. family guide and toolkit': 9,
    'considering hybrid': 10,
    'charging and range': 11,
    'our electric partnerships': 12,
    'finance': 13,
    'mobility': 14,
    'id. buzz': 15,
    'used cars': 16
};

// Function to sanitize text for SQL inserts
function sanitize(text) {
    return text ? text.replace(/'/g, "''") : '';
}

// Function to generate SQL inserts for new entries if they don’t exist
function generateInsertStatements(table, column, values) {
    values = values.map(value => value.toLowerCase());
    let sql = `-- Insert new values into ${table} if not exists\n`;
    values.forEach(value => {
        sql += `INSERT INTO ${table} (${column}) SELECT '${sanitize(value)}' WHERE NOT EXISTS (SELECT 1 FROM ${table} WHERE LOWER(${column}) = LOWER('${sanitize(value)}'));\n`;
    });
    return sql;
}

// Function to generate mappings using subqueries to resolve IDs dynamically
function generateMappingStatements(table, itemIdColumn, valueIdColumn, itemName, valueTable, valueColumn, values) {
    let sql = `-- Insert mappings for ${table}\n`;
    values.forEach(value => {
        sql += `INSERT INTO ${table} (${itemIdColumn}, ${valueIdColumn})\n`;
        sql += `SELECT\n`;
        sql += `  (SELECT id FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${sanitize(itemName)}') LIMIT 1),\n`;
        sql += `  (SELECT id FROM ${valueTable} WHERE LOWER(${valueColumn}) = LOWER('${sanitize(value)}') LIMIT 1)\n`;
        sql += `WHERE EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${sanitize(itemName)}'))\n`;
        sql += `AND EXISTS (SELECT 1 FROM ${valueTable} WHERE LOWER(${valueColumn}) = LOWER('${sanitize(value)}'))\n`;
        sql += `ON CONFLICT DO NOTHING;\n\n`;
    });
    return sql;
}

function extractModelCodes(prNumbers) {
	const codes = new Set();
	prNumbers.forEach(pr => {
		if (typeof pr === 'string' && pr.includes('/')) {
			const modelCode = pr.split('/')[0].trim();
			if (modelCode) codes.add(modelCode);
		}
	});
	return Array.from(codes);
}


const baseUrl = "https://showroom-assets.volkswagen.co.uk";

// Function to generate SQL for inserting items and mapping relations
function generateSQL(json) {
    let sql = '';
    if (!json.technologyItems || !Array.isArray(json.technologyItems)) {
        console.error('Invalid JSON format: technologyItems array not found.');
        return '';
    }

    sql += '\n-- Insert data into knowledge_hub_items\n';
    json.technologyItems.forEach((item) => {
        let markdownContent = '';

        // Check for multiple assets and ctas.
        markdownContent += `---\n`;
        if(item.assetCollection?.length > 0) {
            item.assetCollection.forEach(asset => {
                if (asset.imageFileName) {
                  asset.imageFileName = baseUrl + asset.imageFileName;
                }
                if (asset.thumbnailImageFileName) {
                    asset.thumbnailImageFileName = baseUrl + asset.thumbnailImageFileName;
                }
                if (asset.assetFileName) {
                    asset.assetFileName = baseUrl + asset.assetFileName;
                }
              });
            const assets = yaml.dump({ assets: item.assetCollection || [] });
            markdownContent += assets;
        }
        if(item.links?.length > 0){
            const links = yaml.dump({ ctas: item.links || [] });
            markdownContent += links;
        }
        markdownContent += `---\n\n`;

        markdownContent += turndownService.turndown(item.marketingDescription || '');

        const isHighlighted = item.isHighlighted || false;
        const categoryId = categoryMapping[item.subsection?.toLowerCase()] || 'NULL';

        const combinedText = item.name + item.subtitle + markdownContent;
        // Get keywords
        const descriptor = new KeywordDescriptor(combinedText);
        const keywords = descriptor.keywords.slice(0, 10);

        sql += `INSERT INTO knowledge_hub_items (name, short_description, primary_image, content, category, popularity, featured, tags)\n`;
        sql += `SELECT '${sanitize(item.name)}', '${sanitize(item.subtitle)}', '${sanitize(baseUrl + item.imageFileName)}', '${sanitize(markdownContent)}',\n`;
        sql += `  (SELECT id FROM knowledge_hub_categories WHERE id = ${categoryId} LIMIT 1), 0, ${isHighlighted}, '${keywords}'\n`;
        sql += `WHERE NOT EXISTS (SELECT 1 FROM knowledge_hub_items WHERE LOWER(name) = LOWER('${sanitize(item.name)}'));\n\n`;

        // Generate mapping statements
        sql += generateMappingStatements('knowledge_hub_item_fuel_types_mapping', 'item_id', 'fuel_type_id', item.name, 'knowledge_hub_item_fuel_types', 'name', item.fuelTypeIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_fuel_injection_types_mapping', 'item_id', 'fuel_injection_type_id', item.name, 'knowledge_hub_item_fuel_injection_types', 'name', item.fuelInjectionTypeIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_fuel_efficiency_levels_mapping', 'item_id', 'efficiency_level_id', item.name, 'knowledge_hub_item_fuel_efficiency_levels', 'name', item.efficiencyLevelIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_emissions_control_types_mapping', 'item_id', 'emissions_control_type_id', item.name, 'knowledge_hub_item_emissions_control_types', 'name', item.emissionsControlTypeIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_gearbox_types_mapping', 'item_id', 'gearbox_type_id', item.name, 'knowledge_hub_item_gearbox_types', 'name', item.gearboxTypeIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_body_styles_mapping', 'item_id', 'body_style_id', item.name, 'knowledge_hub_item_body_styles', 'name', item.bodyStyleIDs || []);
        sql += generateMappingStatements('knowledge_hub_item_spec_item_pr_numbers_mapping', 'item_id', 'spec_item_pr_number_id', item.name, 'knowledge_hub_item_spec_item_pr_numbers', 'name', item.specItemPrNumbers || []);
        sql += generateMappingStatements('knowledge_hub_item_synonyms_mapping', 'item_id', 'synonym_id', item.name, 'knowledge_hub_item_synonyms', 'name', item.synonyms || []);
        
        const modelCodes = extractModelCodes(item.specItemPrNumbers || []);
		sql += generateMappingStatements('knowledge_hub_item_models_mapping', 'item_id', 'model_id', item.name, 'knowledge_hub_item_models', 'code', modelCodes);

   
    });
    
    return sql;
}

// Generate SQL seed commands
const sqlCommands = generateSQL(jsonData);
fs.writeFileSync(outputFile, sqlCommands, 'utf8');
console.log(`SQL seed commands file saved to ${outputFile}`);
