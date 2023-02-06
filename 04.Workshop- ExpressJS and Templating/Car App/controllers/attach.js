module.exports = {
  async get(req, res) {
    const id = req.params.id;
    try {
      const [car, accessories] = await Promise.all([
        req.storage.getCarById(id),
        req.accessory.getAllAccessories(),
      ]);

      res.render("attach", { title: "Attach Accessory", car, accessories });
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
      console.log("Error creating Accessory");
      console.log(err.message);
      res.redirect("/attach/"+ carId )
    }
  },
};
