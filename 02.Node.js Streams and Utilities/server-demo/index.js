const http = require("http");
const fs = require("fs");

const { get, post, match } = require("./src/router");

get("/", (req, res) => {
  res.write("Hello");
  res.end();
});

http.createServer((req, res) => {
    // const url = new URL(req.url, `http://${req.headers.host}`);
    // console.log(url.pathname)

    if (req.url.startsWith("/public/")) {
      fs.createReadStream(`./static/${req.url.slice(8)}`).pipe(res);
    } else {
      match(req, res);
    }
  }).listen(3000);
