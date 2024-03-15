const express = require("express");
const jwt = require("jsonwebtoken");
const port = 8000;

const app = express();
const secretKey = "secret-key-for-jwt-token";

app.get("/", (req, res) => {
  res.json({
    message: "A sample API",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Divyanshi Varde",
    email: "varde@gmail.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authentication"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  }
  res.status(403).json({
    // Return a Forbidden status with appropriate message
    result: "Token is invalid",
  });
}

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send("Invalid token");
    } else {
      res.json({
        message: "Profile accessed!",
        authData,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
