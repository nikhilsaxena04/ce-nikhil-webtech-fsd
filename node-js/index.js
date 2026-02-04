const http = require("http");
const fs = require("fs");
const path = require("path");

const myServer = http.createServer((req, res) => {
  if (req.url === "/image") {
    const filePath = path.join(__dirname, "luffy.png");
    fs.readFile(filePath, (err, data) => {
      res.writeHead(200, { "Content-Type": "image/png" });
      return res.end(data);
    });
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Go to /image");
});

myServer.listen(3000, "localhost", () => {
  console.log("Server is listening on http://localhost:3000");
});
