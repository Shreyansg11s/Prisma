// Require the given module
import fs from "fs";

// Use readFileSync() method

// Store the result (return value) of this
// method in a variable named readMe

// Keep the file in the same folder so
// donot need to specify the complete path
const readMe = fs.readFileSync("readMe.txt", "utf-8");

// log the content of file stored in
// a variable to screen
console.log(readMe);

const data = "Hello, this is the content for writeMe.txt!";

fs.writeFile("writeMe.txt", data, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully!");
});

console.log("Task started...");
setTimeout(() => {
  console.log("Task completed. Exiting process.");
  process.exit(1); // 0 means success, 1 means failure
}, 3000);
