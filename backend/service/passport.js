const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email;
      try {
        const response = await User.findOne({
          email,
        });

        if (response) {
          done(null, response);
        } else {
          const newUser = await new User({
            email,
          }).save();
          done(null, newUser);
        }
      } catch (error) {
        console.log("Error " + error);
        done(error, null);
      }
    }
  )
);
