const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).send("Get Contacts");
});
router.route("/").post((req, res) => {
  res.status(200).send("Create Contact");
});
router.route("/:id").get((req, res) => {
  res.status(200).send(`Get Contact for ${req.params.id}`);
});
router.route("/:id").put((req, res) => {
  res.status(200).send(`Update Contact for ${req.params.id}`);
});
router.route("/:id").delete((req, res) => {
  res.status(200).send(`Delete Contact for ${req.params.id}`);
});

module.exports = router;
