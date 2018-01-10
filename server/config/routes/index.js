var express = require('express');
var router = express.Router();
var models = require('../../api/models');
var TaskController = require('../../api/controllers/TaskController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', TaskController.getAllTasks);

router.post("/updateTask", TaskController.updateTask);

router.post("/addTask", TaskController.createTask);

module.exports = router;
