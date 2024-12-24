const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Title cannot be empty" }
        }
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Genre cannot be empty" }
        }
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Director cannot be empty" }
        }
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Release year must be an integer" }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Movies',
    timestamps: false, 
});

module.exports = Movie;

