const fs = require("fs");


// read files 
// const list= fs.readdirSync("./")
// console.log(list);

//  write files 
// fs.writeFileSync("./output.txt", "Hello again");

const data= JSON.parse(fs.readFileSync("./data.json"))
data.price++;

fs.writeFileSync("./data.json", JSON.stringify(data))
console.log(data)
