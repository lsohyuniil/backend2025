const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// npm i -D nodemon
// npx nodemon ex18_http.js

http
  .createServer(async (req, res) => {
    const filename = path.join("public", "tourSample.html");
    try {
      const data = await fs.readFile(filename);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(3333, () => {
    console.log("http://localhost:3333");
  });
