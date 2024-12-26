'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Reviews',
    timestamps: false,
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Movie, {
      foreignKey: 'fk_movieId',
      allowNull: false,
    });
  };

  return Review; // Must return the model
};
