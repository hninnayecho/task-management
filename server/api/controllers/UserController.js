var models = require("../models");

module.exports = {

    getAllUsers: function (req, res, next) {
        models.User.findAll().then(function (users) {
            res.json(users);
        }).catch(function (err) {
            res.json([]);
        });
    },
}