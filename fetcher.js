const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

request(url, (error, response, body) => {
  if (error) {
    console.log("There was an error with the provided URL"); //if URL has error
    process.exit(1);
  }
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) { //if file doesn't exist
      createFile();
    } else {
      rl.question(`File at ${filePath} already exists. Enter Y to overwrite or any other key to skip? `, (answer) => { //if file exists prompt user to overwrite
        if (answer === "y" || answer === "Y") {
          console.log("File overwritten!");
          createFile();
        } else {
          console.log("File was skipped");
        }
        rl.close();
      });
    }
  });
  const createFile = function() { //writes to file
    fs.writeFile(filePath, body, err => {
      if (err) {
        console.error(err);
      } else {
        const bytes = body.length;
        console.log(`Downloded and saved ${bytes} bytes to ${filePath}`);
        process.exit(1);
      }
    });
  };
});
