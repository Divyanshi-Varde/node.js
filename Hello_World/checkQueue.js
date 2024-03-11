// const fs = require("fs");

// fs.readFile(__filename, () => {
//   console.log("Reading file.....");
// });

// Promise.resolve().then(() => console.log("This is a promise"));
// process.nextTick(() => {
//   console.log("This is a process.nextTick() method");
// });

// setImmediate(() => {
//   console.log("This is a setImmediate function");
// });
// setTimeout(() => {
//   console.log("This is a setTimeout function");
// });

setImmediate(() => {
  console.log("This is setImmediate");
});
setTimeout(() => {
  console.log("This is setTimeout");
}, 0);
