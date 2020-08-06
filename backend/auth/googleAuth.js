const router = require("express").Router();
const passport = require("passport");

const keys = require("../config/keys");
require("../service/passport");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(keys.DOMAIN + "/surveys");
  }
);

module.exports = router;
