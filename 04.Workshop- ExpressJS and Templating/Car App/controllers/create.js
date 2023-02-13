module.exports = {
  get(req, res) {
    res.render("create", { title: "Create Listing" });
  },
  async post(req, res) {
    // console.log(req.body);
    const car = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
      owner: req.session.user.id
    };

    try{
      await req.storage.createCar(car);
      res.redirect("/");
    }catch(err){
      // if(error.name == "ValidationError"){
      //   error = Object.values(err.errors).map(e=> ({msg: e.message}))
      // }
       console.log("Error creating record")
      res.render("create", { title: "Create Listing"});
    }
  }
};
