const fs = require("fs");


// read files 
// const list= fs.readdirSync("./")
// console.log(list);

//  write files 
// fs.writeFileSync("./output.txt", "Hello again");


//  synchronous
// const data= JSON.parse(fs.readFileSync("./data.json"))
// data.price++;

// fs.writeFileSync("./data.json", JSON.stringify(data))
// console.log(data)

fs.readFile("./data.json",(err, dataAsText) =>{
    const data= JSON.parse(dataAsText)
    data.price++;

    fs.writeFile("./data.json", JSON.stringify(data), (err)=>{
        console.log("Write complete")
    })
})