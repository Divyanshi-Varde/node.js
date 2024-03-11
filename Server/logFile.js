const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
  }
  const log = `${Date.now()}: ${req.url} New Request recieved!\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hello ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your results for:" + search);
      default:
        res.end("404:Page not found!");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
