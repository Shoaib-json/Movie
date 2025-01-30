const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/listing");
const { check } = require("../utils/middleware");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js"); 
const upload = multer({ storage });

// Route to render the homepage
router.get("/home", (req, res) => {
    res.render("./listing/listing.ejs");
});

// Route to render all movies
router.get("/movie", async (req, res) => {
    try {
        const movies = await List.find();
        res.render("./listing/movies.ejs", { q: movies });
    } catch (err) {
        next(err);
    }
});

// Route to add a new movie
router.post("/movies",check, upload.single('image'), async (req, res, next) => {
    try {
        const { title, description, director, writer, cast, year, duration, rating } = req.body;

        // Convert cast string to array if it's comma-separated
        const castArray = cast.split(',').map(member => member.trim());

        // Create the proper image object structure
        const imageData = {
            url: req.file ? req.file.path : null,
            filename: req.file ? req.file.originalname : 'poster'
        };

        const newMovie = new List({
            title,
            description,
            director,
            admin: req.user._id,
            writer,
            cast: castArray,
            year: parseInt(year, 10),
            duration: parseInt(duration, 10),
            rating,
            image: imageData  // Pass the properly structured image object
        });

        await newMovie.save();
        console.log("New Movie Created:", newMovie);
        res.redirect("/movie");
    } catch (err) {
        next(err);
    }
});

// Route to view a specific movie by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await List.findById(id)
            .populate({
                path: "review",
                populate: { path: "user" }
            })
            .populate("admin");

        console.log(movie);  // Log the movie details
        res.render("./listing/show.ejs", { lists: movie });
    } catch (err) {
        next(err);
    }
});

// Route to render the edit page for a movie
router.get("/:id/edit", check, async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await List.findById(id);
        res.render("./listing/edit.ejs", { q: movie });
    } catch (err) {
        next(err);
    }
});

// Route to update movie details (with optional image URL)
router.put("/:id/update", check, upload.single('image'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, director, writer, cast, year, duration, rating } = req.body;

        console.log("Request Body:", req.body);

        // Convert cast string to array if it's comma-separated
        const castArray = cast.split(',').map(member => member.trim());

        // Prepare the update data
        const updateData = {
            title,
            description,
            director,
            writer,
            cast: castArray,
            year: parseInt(year, 10),
            duration: parseInt(duration, 10),
            rating
        };

        // If a new file is uploaded, update the image data
        if (req.file) {
            console.log("Updating with new image file:", req.file);
            updateData.image = {
                url: req.file.path,
                filename: req.file.originalname
            };
        }

        const updatedMovie = await List.findByIdAndUpdate(
            id, 
            updateData, 
            { runValidators: true, new: true }
        );

        console.log("Updated Movie:", updatedMovie);

        req.flash("success", "Movie updated");
        return res.redirect("/movie");
    } catch (err) {
        console.log("Error:", err);
        next(err);
    }
});
// Route to delete a movie
router.delete("/:id/delete", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedMovie = await List.findByIdAndDelete(id);
        req.flash("error", "Movie deleted");
        res.redirect("/movie");  // Redirect to movie listing after deletion
    } catch (err) {
        next(err);
    }
});

module.exports = router;
