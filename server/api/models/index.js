'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '../..', 'config', 'database.json'))[
  env
];
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// using force update
/*sequelize.sync({ force: true }).then(function() {
  db.Role.create({ name: 'organization_owner' });
  db.Role.create({ name: 'project_owner' });
  db.Status.create({ name: 'Working on it' });
  db.Status.create({ name: 'Not Started'});
  db.Status.create({ name: 'Pending' });
  db.Status.create({ name: 'Finished' });
});*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
