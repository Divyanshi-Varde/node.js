process.nextTick(() => {
  console.log("this is process.nextTick1");
});

process.nextTick(() => {
  console.log("this is process.nextTick2");
  process.nextTick(() => {
    console.log("this is the inner process.nextTick2 inside nextTick");
  });
});

process.nextTick(() => {
  console.log("this is process.nextTick3");
});

Promise.resolve().then(() => console.log("this is a promise 1."));
Promise.resolve().then(() => {
  console.log("this is a promise 2.");
  process.nextTick(() => {
    console.log("this is the inner process.nextTick inside promise 2");
  })
});
Promise.resolve().then(() => console.log("this is a promise 3."));

// Promise.resolve().then(() => console.log("this is a promise."));

// process.nextTick(() => {
//   console.log("this is process.nextTick2");
// });

// console.log("1");

// process.nextTick(() => {
//   console.log("this is process.nextTick1");
// });

// console.log("2");
