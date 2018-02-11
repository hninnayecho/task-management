'use strict';
var TaskController = require("../controllers/TaskController");
var schedule = require('node-schedule');

module.exports.init = function () {
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = new schedule.Range(0, 6);
  rule.hour = 13;
  rule.minute = 44;
  var mailschedule = schedule.scheduleJob(rule, function () {
    console.log("Schedule Start");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    TaskController.getTaskTomorrowEndDate(tomorrow);
    console.log('***Today is recognized by Rebecca Black!***');
  });
}