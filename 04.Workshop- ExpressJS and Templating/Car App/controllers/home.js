module.exports = {
  async home(req, res) {
    // console.log(res.locals)
    const cars = await req.storage.getAllCars(req.query);
    // console.log(cars);

    res.render("index", {cars, title: "Carbicle", query: req.query, errors: [{msg: "Text error"}] });
  },
};
