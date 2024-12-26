require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models'); // Laadt db + models
//const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const authMiddleware = require('./middlewear/authMiddleware');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
//app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

// Static files (HTML, CSS, JS in frontend)
app.use(express.static(path.join(__dirname, 'frontend')));

// Voorbeeld van beschermd endpoint via authMiddleware
app.post('/add-movie.html', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'add-movie.html'));
});

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Docs
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'docs.html'));
});

// Start de server + test DB-connectie
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
