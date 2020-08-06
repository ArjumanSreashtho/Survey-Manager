const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const localtunnel = require("localtunnel");

const auth = require("./auth/auth");
const keys = require("./config/keys");
const userRouter = require("./routes/userRoute");
const surveyRouter = require("./routes/surveyRoute");
const payment = require("./payment/payment");

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Database has been connected`);
});

const createTunnel = async () => {
  const tunnel = await localtunnel({
    port: 5000,
    subdomain: "johnplayer1614",
    host: "http://serverless.social",
  });
  tunnel.url;
  console.log("Your url: ", tunnel.url);
  tunnel.on("close", () => {
    // tunnels are closed
  });
};

createTunnel();

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: keys.COOKIE_KEY,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", auth);
app.use("/api/user", userRouter);
app.use("/api/survey", surveyRouter);
app.use("/api/payment", payment);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
