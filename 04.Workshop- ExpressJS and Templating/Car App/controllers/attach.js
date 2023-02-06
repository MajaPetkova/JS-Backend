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
    console.log(req.params.id)
    console.log(req.body)
    res.redirect("/");
  },
};
