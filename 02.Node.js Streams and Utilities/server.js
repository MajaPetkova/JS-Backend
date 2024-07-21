const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    console.log("Request");

    if (req.method == "GET") {
        // reading file
      //   fs.readFile("./index.html", (err,data) =>{
      //     res.write(data.toString());
      //     res.end();
      //   });


      // using streams
    //   const fileStream = fs.createReadStream("./index.html");
    //   fileStream.on("data", (chunk) => {
    //     res.write(chunk);
    //   });
    //   fileStream.on("end", ()=>{
    //     res.end()
    //   });


       // using pipe method
    fs.createReadStream("./index.html").pipe(res);

    } else if (req.method == "POST") {
      let body = "";
      req.on("data", (data) => {
        console.log("Chunk >>> ", data.toString());
        body += data;
      });
      req.on("end", () => {
        console.log("Body:", JSON.parse(body));
        const bodyAsObject = JSON.parse(body);
        bodyAsObject.price++;
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.write(JSON.stringify(bodyAsObject));
        res.end();
      });
    }
  })
  .listen(3000);
