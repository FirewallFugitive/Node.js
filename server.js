const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const movieRoutes = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'docs.html'));
});

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database connected and synchronized');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });
