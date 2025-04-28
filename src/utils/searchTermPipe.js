import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sessionSearchTerms } from "../index.js";

/*
This algorithm is provided in order to transport a tuple(array of strings) 
from the main thread to the database and manage data transit for that tuple.
*/

// configs

// Alternative for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the assets directory
const dbPath = path.resolve(__dirname, "../db");
console.log("dbPath", dbPath);

let appDB = fs.readFileSync(path.join(dbPath, "memeSeekerDB.json"), "utf8");
let appDBParsed = JSON.parse(appDB);  // copy of db to be manipulated


// @get db.searchTerms


// @put 
// get session search terms from main thread
const newTerms = sessionSearchTerms() || [];
console.log("newTerms", newTerms);

// te3bya
const searchTermTuple = [...searchTerms, ...newTerms];
console.log("searchTermTuple", searchTermTuple);


export const searchTermTransit = {

    // @get searchTerms from db
    getSearchTerms: () => {
        let searchTermsFromDb = appDBParsed.searchTerms || [];  
        console.log("searchTerms", searchTermsFromDb);
        return searchTermsFromDb;
    },

    // @put searchTerms to db
    setSearchTerms: (terms) => {
        appDBParsed.searchTerms = terms;
        appDB = JSON.stringify(appDBParsed);
        fs.writeFileSync(path.join(dbPath, "memeSeekerDB.json"), appDB);
}
}





// ba3tha l db
appDBParsed.searchTerms = searchTermTuple;
appDB = JSON.stringify(appDBParsed);