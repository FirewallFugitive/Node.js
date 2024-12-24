const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./db');
const userRoutes = require('./routes/userRoutes');
const entityRoutes = require('./routes/entityRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/entities', entityRoutes);

// Root documentation
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/docs/endpoints.html'); // Documentation HTML
});

// Database Connection
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
