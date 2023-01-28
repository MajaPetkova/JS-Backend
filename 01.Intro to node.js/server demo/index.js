const http = require("http");

const server = http.createServer((req, res) => {
  console.log("req received");
  console.log(req.method, req.url)
  const url= new URL(req.url , `http://${req.headers.host}`);

if(url.pathname == "/home"){
    res.write("<h1>Hello world from home page</h1>");
    res.end();
}else if(url.pathname == "/about"){
    res.write("About Page");
    res.end();
}else{
    res.statusCode = 404;
    res.write("Page not found")
}

//   console.log(req.headers)

  res.write("Hello world");
  res.end();
});

server.listen(3000)