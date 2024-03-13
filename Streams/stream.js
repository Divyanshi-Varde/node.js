const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const status = require("express-status-monitor");

const PORT = 8080;

const app = express();

app.use(status());

// app.get("/", (req, res) => {
//   fs.readFile("./data.txt", (err, data) => {
//     res.end(data);
//   });
// });

fs.createReadStream("./data.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./data.gz"))
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./data.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => {
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
