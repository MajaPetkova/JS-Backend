const http = require("http");
const fs= require("fs");


http.createServer((req, res)=>{
const url= new URL(req.url, `http://${req.headers.host}`)
// console.log(url.pathname)

if(url.pathname == "/"){
    res.writeHead(301, {
        Location: "index.html"
    });
    res.end();
    fs.createReadStream(`./static/index.html`).pipe(res)
}else if(url.pathname.slice(-5) == ".html"){
    fs.createReadStream(`./static${url.pathname}`).pipe(res)
}


}).listen(3000)