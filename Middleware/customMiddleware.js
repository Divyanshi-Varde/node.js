const http = require("http");
const port = 8000;

function logRequests(req, res, next) {
  console.log(`${new Date().toISOString()}-${req.method} ${req.url}`);
  next();
}

function authenticate(req, res, next) {
  const authorized = req.headers.authorization === "secret_token";
  if (!authorized) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Not authorized!");
  } else {
    next();
  }
}

function applyMiddleware(middleware, req, res) {
  const next = () => {
    const currentMiddleware = middleware.shift();
    if (currentMiddleware) {
      currentMiddleware(req, res, next);
    }
  };
  next();
}

const server = http.createServer((req, res) => {
  const middleware = [logRequests, authenticate];

  const finalHandler = () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  };

  middleware.push((_req, _res) => finalHandler());
  applyMiddleware(middleware, req, res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
