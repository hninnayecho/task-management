'use strict';

module.exports = function(sequelize, Sequelize) {
  var Task = sequelize.define(
    'Task',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }
  );

  return Task;
};
