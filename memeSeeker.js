
//import { main } from "./src/index.js";

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import fs from 'node:fs';


let GIPHY_API_KEY = process.env.GIPHY_API_KEY | '';


const rl = readline.createInterface({
  input,
  output
})

  const keyQuest = await rl.question('Do you have a Giphy API KEY?? */N..  ');
  rl.pause();

    if (keyQuest.toUpperCase() == "N") {
        console.log("This app require a Giphy API KEY \n https://developers.giphy.com/docs/api/")
        process.exit()
    } else {
      rl.resume();
       let apiKEY = await rl.question("Enter you Giphy API KEY..  ");
    
        fs.readFileSync('./src/db/memeSeekerDB.json', 'utf8', (err,data) => {
        if (err) {
          console.log("erororor")
        } else {
          console.log("file content..", data)
        }
       })
      
       rl.close();
    }
    
    
    
   // console.log(process.env.GIPHY_API_KEY) 



    

    



// https://stackoverflow.com/questions/36540996/how-to-take-two-consecutive-input-with-the-readline-module-of-node-js

