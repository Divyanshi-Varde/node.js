// setTimeout(() => {
//   console.log("This is setTimeout 1");
// }, 0);
// setTimeout(() => {
//   console.log("This is setTimeout 2");
//   process.nextTick(() => {
//     console.log("nextTick inside setTimeout");
//   });
// }, 0);
// setTimeout(() => {
//   console.log("This is setTimeout 3");
// }, 0);

setTimeout(() => {
  console.log("This is setTimeout 1");
}, 500);

setTimeout(() => {
  console.log("This is setTimeout 2");
}, 0);

setTimeout(() => {
  console.log("This is setTimeout 3");
}, 1000);
