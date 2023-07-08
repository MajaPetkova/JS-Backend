module.exports = ()=>(req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next()
}