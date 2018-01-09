var express = require('express');
var router = express.Router();
var models = require('../../api/models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function (req, res, next) {
  models.Task.findAll().then(function (tasks) {
    res.json(tasks);
  }).catch(function (err) {
    res.json([]);
  });
})

router.post("/updateTask", function (req, res, next) {
  models.Task
    .update({
      name: req.body.name,
      dueDate: req.body.dueDate,
      label: req.body.label,
    },
    {
      where: { id: req.body.id }
    }).then(function () {
      models.Task.findAll().then(function (tasks) {
        res.json(tasks);
      }).catch(function (err) {
        res.json([]);
      });
    }).catch(function (err) {
      res.json([]);
    });

});

router.post("/addTasks", function (req, res, next) {
  models.Task
    .create({
      name: req.body.name,
      dueDate: req.body.dueDate,
      label: req.body.label,
    })
    .then(function () {
      models.Task.findAll().then(function (tasks) {
        res.json(tasks);
      }).catch(function (err) {
        res.json([]);
      });
    }).catch(function (err) {
      res.json([]);
    });

});

module.exports = router;
