module.exports = {
   async details(req, res) {
    const id= req.params.id;
    const car= await req.storage.getCarById(id);
    // console.log(car)
    if(req.session.user && req.session.user.id == car.owner){
      res.locals.isOwner= true;
    }
    if(car){
      res.render("details", {title:`Carbicle - ${car.name}`, car});
    }else{
      res.redirect("/404")
    }
 
    },
  };