const express = require('express');
const router = express.Router();
const Review = require('../models/review');


router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});


router.post('/:movieId', async (req, res) => {
    const { movieId } = req.params; 
    const { username, rating, review } = req.body; 

    try {
        if (!username || !rating || !review) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        
        const newReview = await Review.create({
            username,
            rating,
            review,
            fk_movieId: movieId,
        });

        res.status(201).json(newReview);
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ error: 'Failed to add review.' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, rating, review } = req.body;

    try {
        const existingReview = await Review.findByPk(id);
        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        existingReview.username = username || existingReview.username;
        existingReview.rating = rating || existingReview.rating;
        existingReview.review = review || existingReview.review;

        await existingReview.save();
        res.json(existingReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Failed to update review.' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
