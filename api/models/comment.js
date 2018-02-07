'use strict';

module.exports = function(sequelize, Sequelize) {
  var Comment = sequelize.define(
    'Comment',
    {
        description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      }
    }
  );

  Comment.associate = function(models) {
    Comment.belongsTo(models.Task, { as: 'task' });
    Comment.belongsTo(models.User);
  };
  return Comment;
};
