

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import fs from 'node:fs';


let devTasks = {
    "taskName": "",
    "Date": new Date().toLocaleDateString(),
    "Time": new Date().toLocaleTimeString(),
}



let devDb = fs.readFileSync('./msDevDb.json', 'utf8', (err, data) => { 
    if (err) {
        console.log("Error reading file:", err);
        return null;
    } else {
        
        return data;
    }
})

let parsedDb = JSON.parse(devDb); // Parse the JSON data
let tasks = parsedDb.tasks; // Access the tasks array


console.log("Welcome to your app dev environment Dah");

const rl = readline.createInterface({
    input,
    output
});

const task = await rl.question(
    'What do you want to do? \n 1. Add a new task \n 2. Remove a task \n 3. List all tasks \n 4. Exit \n ');

rl.pause();

switch (task) {
    case "1":
        console.log("Adding a new task...");
        const newTask = await rl.question('Enter the task name: ');
        rl.pause();
        tasks.push(newTask); // Add the new task to the tasks array
        parsedDb.tasks = tasks; // Update the tasks in the parsed database
        console.log(`New task added: ${newTask}`);
        break;
    case "2":
        console.log("Removing a task...");
        const removeTask = await rl.question('Enter the task name to remove: ');
        rl.pause();
        tasks = tasks.filter(task => task !== removeTask); // Remove the task from the tasks array
        console.log(`Task removed: ${removeTask}`);
        break;
    case "3":
        console.log("Listing all tasks...");
        console.log("Tasks:", tasks);
        break;
    case "4":
        console.log("Exiting...");
        rl.close();
        break;
    default:
        console.log("Invalid option. Please try again.");
        rl.close();
        break;
}