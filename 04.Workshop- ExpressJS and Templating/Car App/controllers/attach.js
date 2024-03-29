module.exports = {
  async get(req, res) {
    const id = req.params.id;
    try {
      const [car, accessories] = await Promise.all([
        req.storage.getCarById(id),
        req.accessory.getAllAccessories(),
      ]);

      if(car.owner != req.session.user.id){
        console.log("User is not Owner")
        return res.redirect("/login")
     }
      const existingIds= car.accessories.map(a=> a.id.toString() );
      const availableAccessories= accessories.filter(x=> existingIds.includes(x.id.toString()) == false );
      res.render("attach", { title: "Attach Accessory", car, accessories: availableAccessories });
    } catch (err) {
      res.redirect("/404");
    }
  },
  async post(req, res) {
    const carId= req.params.id;
    const accessoryId= req.body.accessory
    // console.log(req.body, req.params.id)

    try {
      if(await req.storage.attachAccessory(carId, accessoryId, req.session.user.id)){
        res.redirect("/");
      }  else{
        res.redirect("/login");
      }
    } catch (err) {
      console.log("Error creating accessory");
      console.log(err.message);
      res.redirect("/attach/"+ carId )
    }
  },
};
