var models = require("../models");

module.exports = {

    getAllTasks: function (req, res, next) {
        models.Task.findAll({
            where: { CreatedById: req.user.id }
        }).then(function (tasks) {
            res.json(tasks);
        }).catch(function (err) {
            res.json([]);
        });
    },

    createTask: function (req, res, next) {
        models.Task
            .create({
                name: req.body.name,
                dueDate: req.body.dueDate,
                label: req.body.label,
                CreatedById: req.user.id
            })
            .then(function () {
                return models.Task.findAll({
                    where: { CreatedById: req.user.id }
                });
            })
            .then(function (tasks) {
                res.json(tasks);
            }).catch(function (err) {
                res.json([]);
            });
    },

    updateTask: function (req, res, next) {
        console.log("req.body.id   "+req.body.id);

        models.Task
            .update({
                name: req.body.name,
                dueDate: req.body.dueDate,
                label: req.body.label,
                CreatedById: req.user.id
            },
            {
                where: { id: req.body.id }
            })
            .then(function () {
                return models.Task.findAll({
                    where: { CreatedById: req.user.id }
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