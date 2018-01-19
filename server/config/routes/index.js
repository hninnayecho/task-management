var express = require('express');
var router = express.Router();
var models = require('../../api/models');
var TaskController = require('../../api/controllers/TaskController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/tasks', TaskController.getAllTasks);

router.post("/updateTask", TaskController.updateTask);

router.post("/addTask", TaskController.createTask);

router.post('/api/login', function(req, res, next) {
  console.log('api/login route entered222');
  var email = req.body.email;
  var password = req.body.password;
  console.log('email is ' + email);
  console.log('password is ' + password);
  if (email === 'admin@email.com' && password === 'admin') {
    //const token = jwt.sign({username : username, password: password}, jwtSecret);
    const options = req.body.remember ? {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    } : {};
  
    /*res.cookie('access_token', token, _.assign({}, options, {
      httpOnly: true,
    }));*/
    res.cookie('authenticated', true, options);
    res.json({});
    //res.send('success');
  } else {
    console.log('>>>>>>>>> not authenticated');
    // don't do this in real project
    res.json({});
    //res.send('error');
  }
});

router.get('/api/logout', function(req, res, next) {
  console.log('/api/logout');
  //res.clearCookie('access_token');
  res.clearCookie('authenticated');
  res.json({});
});

module.exports = router;
