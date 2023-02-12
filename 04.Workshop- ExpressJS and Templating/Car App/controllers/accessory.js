const { post } = require("./create");

module.exports = {
  get(req, res) {
    res.render("createAccessory", { title: "Create Accessory" });
  },

 async post(req, res) {
    const accessory = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: Number(req.body.price),
      owner: req.session.user.id
    };
    // console.log(accessory);
    try{
        await req.accessory.createAccessory(accessory)
        res.redirect("/");
    }catch(err){
       console.log("Error creating accessory") ;
       console.log(err.message);
       res.redirect("/accessory")
    }
  },
};
