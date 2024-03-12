const express = require("express");
const http = require("http");

const port = 8080;

const app = express();

app.get("/", (req, res) => {
//   res.send("Hello from home page!");
  res.send(`Hello ${req.query.name}`);
});

app.get("/about", (req, res) => {
  res.send("Hello from about page!");
});

http.createServer(app);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
