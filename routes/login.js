const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl , logOut } = require("../utils/middleware");

// Route to render the signup page
router.get("/sign", (req, res) => {
    res.render("./listing/signup.ejs");
});

// Route to handle user signup
router.post("/sign", async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user instance without the password
        let newUser = new User({ username, email });
        
        // Register the user and automatically hash the password
        await User.register(newUser, password);

        console.log("User Created:", newUser);  // Log the newly created user

        // Redirect to the login page after successful signup
        res.redirect("/user/login");
    } catch (err) {
        console.log("Signup Error:", err);  // Log any errors
        next(err);  // Pass the error to the next middleware
    }
});

// Route to render the login page
router.get("/login", (req, res) => {
    res.render("./listing/login.ejs");
});

// Route to handle user login with Passport.js authentication
router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/login", // Redirect to '/login' if authentication fails
        failureFlash: true, // Enable flash messages on failure
        successRedirect: "/movie", // Redirect to the movie page on successful login
        failureMessage: true, // Provide a failure message for unsuccessful login
    })
);

router.get("/logout", logOut);

module.exports = router;
