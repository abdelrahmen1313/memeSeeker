import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sessionSearchTerms } from "..";

// Alternative for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the assets directory
const dbPath = path.resolve(__dirname, "../db");
console.log("dbPath", dbPath);

let appDB = fs.readFileSync(path.join(dbPath, "memeSeekerDB.json"), "utf8");
let appDBParsed = JSON.parse(appDB);

let searchTerms = appDBParsed.searchTerms || [];
console.log("searchTerms", searchTerms);

console.log("appDBParsed", appDBParsed);

// jiben
const newTerms = sessionSearchTerms() || [];
console.log("newTerms", newTerms);

// te3bya
const searchTermTuple = [...searchTerms, ...newTerms];
console.log("searchTermTuple", searchTermTuple);

// ba3tha l db
appDBParsed.searchTerms = searchTermTuple;
appDB = JSON.stringify(appDBParsed);