import { createRequire } from "module";
const require = createRequire(import.meta.url);

const nlp = require('@nlpjs/basic-nlp');

function extractKeyword(terms) {
    const processor = new nlp.TextProcessor();
    processor.addEntities(terms);

    const rankedWords = processor.extractKeyphrases(terms, { topN: 1 }); // Get the highest-ranked term
    return rankedWords.length ? rankedWords[0] : null;
}

// Example data (your list of words/phrases)
const terms = [
    "Meme generator",
    "Funny image app",
    "AI-based humor",
    "Instant meme maker",
    "Trending meme search",
    "Hilarious photo editor"
];

const uniqueTerm = extractKeyword(terms);
console.log(`Generated Search Term: ${uniqueTerm}`);
