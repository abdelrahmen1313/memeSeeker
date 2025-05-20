import { SearchTermSuggester } from "./ranker.js";


async function demonstrateSearchSuggeter() {
    const searchHistory = ["MIA KHALIFA", "POP CORN", "JAVA", "PYTHON", "C++", "RUST", "GOLANG", "JAVASCRIPT", "HTML", "CSS",
       "funny cat",
        "dog memes",
        "sorry",
        "duck face",
        "wallet",
        "hello",
        "flirting",
        "funny",
        "snacks"];

    const suggester = new SearchTermSuggester();
    await suggester.loadSearchLibrary(searchHistory).train();

    // Example suggestions
    const currentSearch = "machine learning";
    const suggestion = await suggester.suggestNextTerm(currentSearch);

    console.log(`Current Search: "${currentSearch}"`);	
    console.log(`Suggested Next Search: "${suggestion}"`);

    const anotherSearch = "neural networks";
    const anotherSuggestion = await suggester.suggestNextTerm(anotherSearch);

    console.log(`\nCurrent Search: "${anotherSearch}"`);
    console.log(`Suggested Next Search: "${anotherSuggestion}"`);

}

// Run the demonstration
demonstrateSearchSuggeter().catch(console.error);

