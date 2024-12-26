// routes/movies.js

const express = require('express');
const router = express.Router();
const { Movie } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const movies = await Movie.findAndCountAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.json({
      totalItems: movies.count || 0, // Total number of movies
      totalPages: Math.ceil(movies.count / limit) || 1, // At least 1 page
      currentPage: Math.floor(offset / limit) + 1,
      movies: movies.rows || [], // Ensure movies is always an array
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies', movies: [] }); // Fallback to an empty movies array
  }
});


// SEARCH (define before /:id)
router.get('/search', async (req, res) => {
  const { q, limit = 10, offset = 0 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter `q`' });
  }

  try {
    const movies = await Movie.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { genre: { [Op.like]: `%${q}%` } },
          { director: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
        ],
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Either return 404 if no matches:
    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movies);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const { title, genre, director, releaseYear, description } = req.body;

    if (!title || !genre || !director || !releaseYear) {
      return res
        .status(400)
        .json({ error: 'All required fields must be filled.' });
    }

    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await movie.update(req.body);
    res.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await movie.destroy();
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

module.exports = router;
