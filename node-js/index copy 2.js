const http = require("http");
const fs = require("fs");
const path = require("path");

const routes = {
  "/": "a.html",
  "/courses": "course.html",
  "/login": "login.html",
};

const server = http.createServer((req, res) => {
  const fileName = routes[req.url];
  if (!fileName) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const pagePath = path.join(__dirname, fileName);
  fs.readFile(pagePath, "utf-8", (err, html) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Could not load page");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on http://localhost:3000");
});
