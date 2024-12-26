'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Username cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty' }
      }
    }
  }, {
    tableName: 'Users',
    timestamps: false
  });

  // optional associations, e.g.:
  // User.associate = (models) => { ... };

  return User;
};
