const http = require("http");

const homePage = `<h1>Home Page</h1> 
<p>Welcome to our page</p>`;

const aboutPage = `
<h1>About Us</h1> 
<p> Contact Information</p>
`;
const defaultPage = `
<h1>404 Not found</h1> 
<p>The resource you requested cannot be found</p>
`;

const server = http.createServer((req, res) => {
  //   console.log("req received");
  console.log(req.method, req.url);
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname == "/") {
    homeController(req, res);
  } else if (url.pathname == "/about") {
    aboutController(req, res);
  } else {
    defaultController(req, res);
  }
});

function homeController(req, res) {
  res.write(layout(homePage));
  res.end();
}

function aboutController(req, res) {
  res.write(layout(aboutPage));
  res.end();
}
function defaultController(req, res) {
  res.statusCode = 404;
  res.write(layout(defaultPage));
  res.end();
}
function layout(body, title = "Hello World") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<title>${title}</title>
</head>
<body>
   <nav>
     <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
     </ul>
   </nav>
${body}
</body>
</html>`;
}

server.listen(3000);
