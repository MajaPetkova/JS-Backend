module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await req.storage.getCarById(id);
    
    if (car.owner != req.session.user.id) {
      return res.redirect("/login");
    }
    if (car) {
      res.render("delete", { title: `Delete Listing - ${car.name}`, car });
    } else {
      res.redirect("/404");
    }
  },
  async post(req, res) {
    const id = req.params.id;
    try {
      if (await req.storage.deleteCarById(id, req.session.user.id)) {
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log("Attempted to delete non-existent id", id);
      res.redirect("/404");
    }
  },
};
