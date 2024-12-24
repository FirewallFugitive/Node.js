const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const { Op } = require('sequelize');

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new movie
router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        await movie.update(req.body);
        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        await movie.destroy();
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;

    console.log('Search route hit with query:', query);

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }

    // Je zoeklogica
    try {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${query}%` // Case-insensitive zoeken
                }
            }
        });

        if (movies.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movies);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  


module.exports = router;
