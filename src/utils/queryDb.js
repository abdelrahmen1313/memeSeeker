import fs from 'fs';
import { resolvePath } from "../../config/paths.js"
const dbPath = resolvePath.db('memeSeekerDB.json');

export function lookupDB() {
    // Check if the file exists
    if (!fs.existsSync(dbPath)) {
        console.error("Database file not found:", dbPath);
        return null;
    }

}

export function getSearchTerms() {
let rawDB = fs.readFileSync(dbPath, 'utf8', (err, data) => { 
    if (err) {
        console.log("Error reading file:", err);
        return null;
    } else {
        return data;
    }
})
let parsedDB = JSON.parse(rawDB); // Parse the JSON data
let searchTerms = parsedDB.searchTerms || []; // Access the searchTerms array
return searchTerms;

}



