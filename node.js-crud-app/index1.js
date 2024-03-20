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

function getUserIdFromUrl(url) {
  const segments = url.split("/");
  return parseInt(segments[segments.length - 1]);
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    read((users) => {
      //   res.sendStatus(200);
      res.end(JSON.stringify(users));
    });
  } else if (req.method === "POST" && req.url === "/create") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      read((users) => {
        const newUsers = [...users, newUser];
        write(newUsers, () => {
          console.log(`User created: ${JSON.stringify(newUser)}`);
          res.end(JSON.stringify(newUser));
        });
      });
    });
  } else if (req.method === "PUT" && req.url.startsWith("/update/")) {
    const userId = getUserIdFromUrl(req.url);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedUser = JSON.parse(body);
      read((users) => {
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, ...updatedUser };
          } else {
            return user;
          }
        });
        write(updatedUsers, () => {
          console.log(`User updated with id ${userId}`);
          res.end(JSON.stringify(updatedUsers));
        });
      });
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/delete/")) {
    const userId = getUserIdFromUrl(req.url);
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
