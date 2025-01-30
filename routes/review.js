const express = require('express');
const router = express.Router();
const Review = require("../models/review");
const List = require("../models/listing");

// Route to handle creating a new review
router.post("/:id", async (req, res, next) => {
    const { rating, comment } = req.body;

    try {
        // Create a new review instance
        const newReview = new Review({
            comment,
            rating,
            user: req.user._id,
        });

        // Save the review
        await newReview.save();

        // Find the listing by ID
        const listing = await List.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        // Add the review to the listing
        listing.review.push(newReview);

        // Save the updated listing
        await listing.save();

        console.log("Updated Listing:", listing);
        console.log("New Review:", newReview);

        // Redirect after review creation
        res.redirect(`/${req.params.id}`);
    } catch (err) {
        console.log("Error creating review:", err);  // Log errors
        next(err);  // Pass the error to the error handler
    }
});

// Route to handle deleting a review
router.delete("/:id/:r", async (req, res, next) => {
    try {
        const { id, r } = req.params;

        // Remove the review from the listing
        await List.findByIdAndUpdate(id, { $pull: { review: r } });

        // Delete the review from the database
        const deletedReview = await Review.findByIdAndDelete(r);

        console.log("Deleted Review:", deletedReview);

        // Redirect after deletion
        res.redirect(`/${id}`);
    } catch (err) {
        console.log("Error deleting review:", err);  // Log errors
        next(err);  // Pass the error to the error handler
    }
});

module.exports = router;
