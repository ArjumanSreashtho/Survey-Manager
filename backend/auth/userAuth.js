const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const response = await User.findOne({
      email: email,
    });
    if (response) {
      console.log(response);
      res.send({
        message: "Email address already exits.",
      });
    } else {
      const user = new User({
        email: email,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      const hasHpass = await bcrypt.hash(user.password, salt);
      user.password = hasHpass;
      await user.save();
      console.log(user);
      req.session.userId = user._id;
      res.send({
        message: "User has been created successfully.",
      });
    }
  } catch (error) {
    res.send({
      error: error,
      message: "Can not create user now. Please try again later.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({
        message: "Email has not been found.",
      });
    }
    const checkUser = await bcrypt.compare(password, user.password);
    if (!checkUser) {
      return res.send({
        message: "Incorrect password.",
      });
    }
    req.session.userId = user._id;
    console.log(req.session.userId);
    res.send(true);
  } catch (error) {
    res.send({
      error: error,
      message: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
