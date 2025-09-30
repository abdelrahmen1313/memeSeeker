// neglect reasoning;
// await commander

import ollama from "ollama";
import { getSearchTerms } from "./src/utils/queryDb.js";

async function generateSearchTerm() {
    let searchTerms = await getSearchTerms(); // Get the search terms from the database

  const response = await ollama.generate({
      
    model: "gemma3:1b",
    prompt:
    `
    if i tell you ${searchTerms} what comes to your mind ? 
    `
    stream: false,
    temperature: 0.1,
  });
  return response; // Return the generated search term
}

const nextTerm = await generateSearchTerm();
console.log("full Response : ", nextTerm);

//console.log(response.message.content)
//console.log("full response:", response);
