const connectDb = require("./database");
const express = require("express");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

const app = express();
connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/urls", urlRoutes);
app.use("/", userRoutes);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8003, () => {
  console.log("The application is running on localhost:8003");
});
