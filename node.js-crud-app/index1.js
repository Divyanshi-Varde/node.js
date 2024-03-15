const fs = require("fs");
const http = require("http");
const port = 8080;

function read(callback) {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(JSON.parse(data));
    }
  });
}

function write(data, callback) {
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
    callback();
  });
}

const server = http.createServer((req, res) => {
  const { url } = req;

  if (req.method === "GET" && req.url === "/users") {
    read((users) => {
      //   res.sendStatus(200);
      res.end(JSON.stringify(users));
    });
  } else if (req.method === "POST" && req.url === "/createUser") {
    const { body, method } = req;
    console.log({ body, method });
  } else if (req.method === "DELETE" && req.url.startsWith("/delete/")) {
    const userId = parseInt(req.url.substring(8));
    read((users) => {
      const filteredUsers = users.filter((user) => user.id !== userId);
      write(filteredUsers, () => {
        console.log(`User deleted with id ${userId}`);
        // res.sendStatus(200);
        res.end(JSON.stringify(filteredUsers));
      });
    });
  }
});
server.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
