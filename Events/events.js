const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("order-pizza", (size, topping) => {
  console.log(`Order recieved:Baking a ${size} pizza with ${topping}`);
});

emitter.on("order-pizza", (size) => {
  if (size === "large") {
    console.log("Serving a complimentary drink");
  }
});

emitter.emit("order-pizza", "large", "tomatoes");
