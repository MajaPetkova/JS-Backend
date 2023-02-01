const express= require("express") ;
const app= express();
const handlebars= require("express-handlebars");
const hbs = handlebars.create({
  extname: '.hbs'  
});
app.engine(".hbs", hbs.engine );
app.set('view engine', '.hbs')


app.get("/", (req, res)=>{
    res.render('home', {layout:false})
})

app.listen(3000, ()=> console.log("App is listening on port 3000"))