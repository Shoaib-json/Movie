const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const localPass = require("passport-local").Strategy;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const User = require("./models/user");

require('dotenv').config();

const userRoutes = require("./routes/login");
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
main().then(() => {
  console.log("Database is connected");
}).catch(err => {
  console.error("Database connection error:", err);
  process.exit(1);  // Exit the application on connection failure
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movie');
}

// Session Configuration
const sessionOptions = {
  secret: "truck",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPass(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set locals for success, error messages and current user
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Middleware to handle favicon requests
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    return res.status(204).end();  // No Content response
  }
  next();
});

// Route Handlers
app.use("/", listingRoutes);
app.use("/user", userRoutes);
app.use("/re", reviewRoutes);

// 404 Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).render("error", { message: "Page not found!" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    req.flash("error", "Something went wrong, please try again later.");
    res.status(err.status || 500).send("Something went wrong. Please try again later.");
  });
// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
