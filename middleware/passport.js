const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
