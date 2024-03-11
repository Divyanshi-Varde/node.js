const http = require("http");
const port = 8000;

const myServer = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from server!");
});

myServer.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
