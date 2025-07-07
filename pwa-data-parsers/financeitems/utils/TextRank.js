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

export default TextRank