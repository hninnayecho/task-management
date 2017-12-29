var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next){
  var tasks = [
    {
      name: 'task1',
      dueDate: '2018-12-29',
      label: 'InProgress'
    },
     {
      name: 'task2',
      dueDate: '2018-12-30',
      label: 'Pending'
    },
     {
      name: 'task3',
      dueDate: '2018-12-31',
      label: 'Finished'
    }
  ];
  res.json(tasks);
})

module.exports = router;
