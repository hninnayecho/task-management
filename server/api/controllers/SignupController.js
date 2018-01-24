var models = require("../models");

module.exports = {

    signup: function (req, res, next) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        console.log('username is '+username);
        console.log('email is ' + email);
        console.log('password is ' + password);
        models.User
            .findOne({
                where: {
                    username: req.body.username,
                }
            })
            .then(function (user) {
                if (user) {
                    res.send("User already exists");
                } else {
                    models.User
                        .create({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        .then(function () {
                            const options = req.body.remember ? {
                                maxAge: 30 * 24 * 60 * 60 * 1000,
                            } : {};
                            res.cookie('authenticated', true, options);
                            res.json({});
                        }).catch(function (err) {
                            res.json([]);
                        });
                }
            });
    }
};