import { ApiKeyDialogue } from "./views/ApiKeyDialogue.js";
import { appUI } from "./views/HomePage.js";



export const main = async () => {
   try {
     await ApiKeyDialogue();
   } catch (error) {
     console.error("Error in ApiKeyDialogue:", error);
   }
    appUI(); 
};

main();

/* export typed search terms
export  const sessionSearchTerms = async () => {
  return searchTerms; // Return the session search terms
  console.log("Session search terms:", searchTerms);
}
 */