var express = require('express');
var router = express.Router();
var models = require('../../api/models');
var TaskController = require('../../api/controllers/TaskController');
var UserController = require('../../api/controllers/UserController');
var SignupController = require('../../api/controllers/SignupController');
var AuthController = require('../../api/controllers/AuthController');
var CommentController = require('../../api/controllers/CommentController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/tasks', AuthController.ensureSignedIn, TaskController.getAllTasks);

router.get('/api/calendar', AuthController.ensureSignedIn, TaskController.getAllTasks);

router.post("/api/tasks/update", AuthController.ensureSignedIn, TaskController.updateTask);

router.post("/api/tasks/add", AuthController.ensureSignedIn, TaskController.createTask);

router.get("/api/tasks/:task_id", AuthController.ensureSignedIn, TaskController.taskDetail);

router.post("/api/tasks/:task_id/comments/add", AuthController.ensureSignedIn, CommentController.createComment);

router.get("/api/tasks/:task_id/comments", AuthController.ensureSignedIn, CommentController.getAllComments);

router.get('/api/users', AuthController.ensureSignedIn, UserController.getAllUsers);

router.post('/api/signup', AuthController.signUp);

router.post('/api/login', AuthController.loginInLocal);

router.get('/api/logout', function (req, res, next) {
  console.log('/api/logout');
  //res.clearCookie('access_token');
  res.clearCookie('authenticated');
  res.json({});
});

module.exports = router;
