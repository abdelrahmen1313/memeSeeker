// neglect reasoning;
// await commander

import ollama from "ollama";
import { getSearchTerms } from "./src/utils/queryDb.js";

async function generateSearchTerm() {
    let searchTerms = await getSearchTerms(); // Get the search terms from the database

  const response = await ollama.generate({
    model: "gemma3:1b",
    prompt: `You are a data scientist shortcut and we are working on an app that fetch memes from the internet.You will generate search terms for memes based on the user's interests. Your mission is to guess a search term based from the user search history. The user has already searched for: ${searchTerms}.
     The search term should be a single word or a short phrase. The search term should be relevant to the user's interests and should be something that could be used to find memes. The search term should be in English. The search term should not contain any special characters or numbers. The search term should not be too long or too short. The search term should not be too generic or too specific. The search term should not be offensive or inappropriate.`,
    stream: false,
    temperature: 0.5,
  });
  return response; // Return the generated search term
}

const nextTerm = await generateSearchTerm();
console.log("full Response : ", nextTerm);

//console.log(response.message.content)
//console.log("full response:", response);
