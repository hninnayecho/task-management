'use strict';

module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        },
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [1, 255]
        },
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      }
    }
  );
  return User;
};
