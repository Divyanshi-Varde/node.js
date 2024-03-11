const fs = require("fs");
// fs.writeFile("demo.txt", "Hey there", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Write successfull!");
//   }
// });

// fs.writeFileSync("test.txt", "Hello there,this is a file operation");

// fs.readFile("./test.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

// const result = fs.readFileSync("./demo.txt", "utf-8");
// console.log(result);

fs.appendFile("./demo.txt", "\nHI, This is an append operation", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Append successful");
  }
});

fs.appendFileSync("./test.txt", "\nHello this is file.js");
