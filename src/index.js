import { ApiKeyDialogue } from "./views/ApiKeyDialogue.js";
import { App } from "./views/HomePage.js";



export const main = async () => {
   try {
     await ApiKeyDialogue();
   } catch (error) {
     throw new Error("Error in ApiKeyDialogue:", error);
   }
    App(); 
};

main();

/* export typed search terms
export  const sessionSearchTerms = async () => {
  return searchTerms; // Return the session search terms
  console.log("Session search terms:", searchTerms);
}
 */