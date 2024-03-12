const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8080;

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    const updatedUser = { ...user, ...body };
    updatedUser.id = id;
    users[id - 1] = updatedUser;

    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.findIndex((user) => user.id === id);

    if (user !== -1) {
      const deletedUser = users.splice(user, 1)[0];
      fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) =>
        res.json({ status: "Success", deletedUser })
      );
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port:${PORT}`);
});
