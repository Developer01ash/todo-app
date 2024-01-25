const passport = require("passport");
const User = require("../models/User");
// const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.serializeUser((user, done) => {
  try {
    done(null, { _id: user._id });
  } catch (error) {
    done(error, null);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

var strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(new Error("UserNotFound"), null);
    } else if (payload.expire <= Date.now()) {
      return done(new Error("TokenExpired"), null);
    } else {
      return done(null, user);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return done(error);
  }
});
var strategyLocal = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("No user found with email:", email);
        return done(null, false, {
          status: 422,
          message: "Invalid credentials.",
        });
      }
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        console.log("Password check failed for user:", password);
        return done(null, false, {
          status: 422,
          message: "Invalid credentials.",
        });
      }

      return done(null, user);
    } catch (err) {
      console.error("Error fetching user:", err);
      return done(err);
    }
  }
);
module.exports = {
  strategy,
  strategyLocal,
};
