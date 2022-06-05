const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

//done: is the new next()
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    // return isMatch ? done(null, foundUser) : done(null, false);

    const foundUser = await User.findOne({ username });
    const isMatch = foundUser
      ? await bcrypt.compare(password, foundUser.password)
      : false;

    if (isMatch) {
      return done(null, foundUser);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const foundUser = await User.findById(jwtPayload._id);
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  }
);
