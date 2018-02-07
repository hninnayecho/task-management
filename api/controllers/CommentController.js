var models = require("../models");

module.exports = {

    getAllComments: function (req, res, next) {
        models.Comment.findAll({
            where: { taskId: req.params.task_id },
            include: [
                {model: models.User}
            ]
        }).then(function (comments) {
            res.json(comments);
        }).catch(function (err) {
            res.json([]);
        });
    },

    createComment: function (req, res, next) {
        models.Comment
            .create({
                description: req.body.comment,
                taskId: req.params.task_id,
                UserId: req.body.userId
            })
            .then(function () {
                return models.Comment.findAll({
                    where: { taskId: req.params.task_id },
                    include: [
                        {model: models.User}
                    ]
                });
            })
            .then(function (comments) {
                res.json(comments);
            }).catch(function (err) {
                res.json([]);
            });
    }
}