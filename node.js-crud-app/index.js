const fs = require("fs");

function read() {
  fs.readFile("./data.json", "utf-8",(err, data) => {
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

function createUser(newUser) {
  read((users) => {
    users.push(newUser);
    write(users, () => console.log("User added"));
  });
}

function readUsers() {
  read((users) => {
    console.log(users);
  });
}

function updateUser(id, updatedInfo) {
  read((users) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedInfo };
      write(users, () => console.log("User updated."));
    } else {
      console.log("User not found");
    }
  });
}

function deleteUser(id) {
  read((users) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    write(filteredUsers, () => console.log(`User deleted with id ${id}`));
  });
}

const operation = process.argv[2];

switch (operation) {
  case "create":
    const newUser = {
      id: parseInt(process.argv[3]),
      user_name: process.argv[4],
      email: process.argv[5],
    };
    createUser(newUser);
    break;
  case "read":
    readUsers();
    break;
  case "update":
    const updated = parseInt(process.argv[3]);
    const updatedInfo = {
      user_name: process.argv[4],
      email: process.argv[5],
    };
    updateUser(updated, updatedInfo);
    break;
  case "delete":
    const deleted = parseInt(process.argv[3]);
    deleteUser(deleted);
    break;
  default:
    console.log(
      "No such command or operation found!"
    );
}