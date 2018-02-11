var models = require("../models");
var MailTrasnporter = require("../../api/utils/MailTransporter");

module.exports = {

    getAllTasks: function (req, res, next) {
        models.Task.findAll({
            where: { UserId: req.user.id }
        }).then(function (tasks) {
            res.json(tasks);
        }).catch(function (err) {
            res.json([]);
        });
    },

    getTaskTomorrowEndDate: function (endDate) {
        models.Task.findAll({
            where: { endDate: endDate},
            include: [
                {model: models.User}
            ]
        }).then(function (tasks) {
            tasks.forEach(task => {
                MailTrasnporter.sendAlertMail({ to: task.User.email });
                console.log("****** " + task.User.email + "   ******");
            });
        }).catch(function (err) {
            console.log("******  Errors occure!   ******");
            console.log(err);
            console.log("************************");
        });
    },

    taskDetail: function (req, res, next) {
        models.Task.find({
            where: { id: req.params.task_id },
            include: [
                {model: models.User}
            ]
        }).then(function (task) {
            res.json(task);
        }).catch(function (err) {
            res.json([]);
        });
    },

    createTask: function (req, res, next) {
        models.Task
            .create({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                label: req.body.label,
                UserId: req.user.id
            })
            .then(function () {
                return models.Task.findAll({
                    where: { UserId: req.user.id }
                });
            })
            .then(function (tasks) {
                res.json(tasks);
            }).catch(function (err) {
                res.json([]);
            });
    },

    updateTask: function (req, res, next) {
        console.log("req.body.id   " + req.body.id);

        models.Task
            .update({
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                label: req.body.label,
                UserId: req.user.id
            },
            {
                where: { id: req.body.id }
            })
            .then(function () {
                return models.Task.findAll({
                    where: { UserId: req.user.id }
                }
                );
            })
            .then(function (tasks) {
                res.json(tasks);
            }).catch(function (err) {
                res.json([]);
            });
    }
}