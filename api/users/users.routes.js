const express = require("express");
const { signup, signin, getUsers } = require("./users.controllers");
const passport = require("passport");
const router = express.Router();

//jwt is not in sign in. eg: if youre not authorized, you cant enter
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);

module.exports = router;
