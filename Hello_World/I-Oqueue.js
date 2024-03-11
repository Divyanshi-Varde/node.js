const fs = require("fs");

setTimeout(() => {
  console.log("This is setTimeout");
}, 0);

fs.readFile(__filename, () => {
  console.log("Reading file...");
});


