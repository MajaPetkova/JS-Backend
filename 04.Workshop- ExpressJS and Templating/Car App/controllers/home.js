module.exports = {
  async home(req, res) {
    const cars = await req.storage.getAllCars();
    // console.log(cars);
    res.render("index", {cars, title: "Carbicle"});
  },
};
