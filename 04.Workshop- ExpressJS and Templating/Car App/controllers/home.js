const { query } = require("express");

module.exports = {
  async home(req, res) {
    console.log(req.session)
    const cars = await req.storage.getAllCars(req.query);
    // console.log(cars);


    res.render("index", {cars, title: "Carbicle", query: req.query});
  },
};
