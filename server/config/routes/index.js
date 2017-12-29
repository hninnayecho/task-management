var express = require('express');
var router = express.Router();
var models = require('../../api/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next){
  models.Task.findAll().then(function(tasks) {
    res.json(tasks);
  }).catch(function(err) {
    res.json([]);
  });
})

module.exports = router;
