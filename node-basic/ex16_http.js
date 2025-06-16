const http = require("http");

http
  .createServer((req, res) => {
    const uri = req.url;
    if (uri == "/") {
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.write(`
            <ul>
                <li><a href='/hi'>Hi</a></li>
                <li><a href='/hello'>Hello</a></li>
            </ul>
            `);
      res.end();
    } else if (uri == "/hi") {
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      //   res.write(`<h2 style="color:green">Hi Node.js~</h2>`);
      res.end(`<h2 style="color:green">Hi Node.js~</h2>`);
    } else if (uri == "/hello") {
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
      res.write(`<h2 style="color:red">Hello Node.js~</h2>`);
      res.end();
    }
  })
  .listen(5555, () => {
    console.log("http://localhost:5555");
  });
