const express = require("express");
const router = express.Router();

const keys = require("../config/keys");

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/signout", (req, res) => {
  req.logout();
  delete req.user;
  res.redirect("/");
});

module.exports = router;
