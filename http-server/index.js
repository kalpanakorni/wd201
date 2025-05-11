const http = require("http");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/registration") {
    serveFile("registration.html", "text/html", res);
  } else if (req.url === "/project") {
    serveFile("project.html", "text/html", res);
  } else if (req.url === "/" || req.url === "/home") {
    serveFile("home.html", "text/html", res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
  }
});

function serveFile(filename, contentType, res) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
