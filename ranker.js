
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const nlp = require('node-nlp');



/**
 * *SearchTermSuggester class - Uses NLP.js to suggest next search term
 * based on a library of previous searches.
 */

export class SearchTermSuggester {
    constructor() {
        // Initialize NLP manager
        this.manager = new NlpManager({ languages: ['en'] });
        this.searchLibrary = []; 
        this.searchPairs = [];
    }

    /**
     * Load a library of search terms
     * @param {string[]} searchTerms 
     */
    loadSearchLibrary(searchTerms) {
        if (!Array.isArray(searchTerms)) {
            throw new Error("searchTerms should be an array");
        }
        this.searchLibrary = searchTerms;

        // Create pairs of consecutive search terms for training
        this.searchPairs = [];
        for (let i = 0; i < searchTerms.length - 1; i++) {
            this.searchPairs.push({
                input: searchTerms[i],
                output: searchTerms[i + 1]
            });
        }
        return this;
    }

    /**
     * Train the NLP model with search term pairs
     */
    async train() {
        if (this.searchPairs.length === 0) {
            throw new Error("No search Available. Load search library first.");
        }
        // Add documents to the manager
        this.searchPairs.forEach((pair, index) => {
         this.manager.addDocument('en', pair.input, `searchPattern${index}`)
         this.manager.addAnswer('en', `searchPattern${index}`, pair.output);
        });

        // Train the model
        console.log("Training the model...");
        await this.manager.train();
        console.log("Model trained successfully.");
        
        return this;
    }

    /**
     * Get newt search term suggestion based on input
     * @param {string} currentSearchTerm
     * @returns {Promise<string>}
     */

    async suggestNextTerm(currentSearchTerm) {
        // Process with NLP
        const response = await this.manager.process('en', currentSearchTerm);

        // If we have a strong match, return the suggested term
        if (response.answers && response.answers.length > 0 && response.answers[0].score > 0.5) {
            return response.answers[0].answer;
        }
        // if no strong match, use similarity approach as fallback
        return this.findMostSimilarTerm(currentSearchTerm);

    }

    /** 
     * Find the most similar term in the library as a fallback
     * @param {string} currentSearchTerm
     * @returns {string}
     */
    findMostSimilarTerm(currentSearchTerm) {
        if (this.searchLibrary.length < 2){
            return "No suggestions available";
        }
        let bestMatch = '';
        let highestScore = -1;

        // Simple Jaccard Similarity for terms
        this.searchLibrary.forEach( (term) => {
            const score = this.calculateSimilarity(currentSearchTerm, term);
            if (score > highestScore) {
                highestScore = score;
                bestMatch = term;
            }
        });

        // Find the term that follows the best match in the library
        const index = this.searchLibrary.indexOf(bestMatch);
        if (index !== -1 && index < this.searchLibrary.length - 1) {
            return this.searchLibrary[index + 1];
        }
        return "No suggestions available";
    }

    /**
     * Calculate similarity between two strings (simple Jaccard Similarity)
     * @param {string} str1
     * @param {string} str2
     * @returns {number}
     */

    calculateSimilarity(str1, str2) {
        const set1 = new Set(str1.toLowerCase().split(' '));
        const set2 = new Set(str2.toLowerCase().split(' '));

        const intersection = new Set([...set1].filter(word => set2.has(word)));
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }
}