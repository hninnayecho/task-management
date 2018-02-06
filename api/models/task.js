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
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }
  );

  Task.associate = function(models) {
    Task.belongsTo(models.User, { as: 'CreatedBy' });
  };
  return Task;
};
