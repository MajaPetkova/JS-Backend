module.exports = {
  async get(req, res) {
    const id = req.params.id;
    try {
      const [car, accessories] = await Promise.all([
        req.storage.getCarById(id),
        req.accessory.getAllAccessories(),
      ]);
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
        await req.storage.attachAccessory(carId, accessoryId);
      res.redirect("/");
    } catch (err) {
      console.log("Error creating accessory");
      console.log(err.message);
      res.redirect("/attach/"+ carId )
    }
  },
};
