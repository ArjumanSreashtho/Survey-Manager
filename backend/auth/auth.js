const app = require("express")();

const googleAuth = require("./googleAuth");
const userAuth = require("./userAuth");

app.use("/google", googleAuth);
app.use("/userauth", userAuth);

module.exports = app;
