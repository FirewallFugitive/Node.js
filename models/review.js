const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Movie = require('./movie');

const Review = sequelize.define('Review', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Username cannot be empty" }
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Rating must be an integer" },
            min: 1,
            max: 5
        }
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Review cannot be empty" }
        }
    }
});

// Define relationships with explicitly named foreign keys
Review.belongsTo(Movie, {
    foreignKey: {
        name: 'fk_movieId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Movie.hasMany(Review, {
    foreignKey: 'fk_movieId'
});

module.exports = Review;
