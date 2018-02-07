const jwt = require('jsonwebtoken');
const _ = require('lodash');

const jwtSecret = 'no secret';
var models = require("../models");
var nodemailer = require('nodemailer');
var MailTrasnporter = require('../utils/MailTransporter');


function authenticate(user, req, res) {
    const token = jwt.sign(user, jwtSecret);
    const options = req.body.remember ? {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    } : {};
    res.cookie('access_token', token, _.assign({}, options, {
        httpOnly: true,
    }));
    res.cookie('authenticated', true, options);
    res.json({});
}

exports.loginInLocal = (req, res, next) => {
    models.User
        .findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then(function (user) {
            if (user) {
                console.log('user is ');
                console.log(JSON.stringify(user));
                authenticate({ id: user.id, email: user.email}, req, res);
            } else {
                console.log('>>>>>>>>> not authenticated');
                res.json({});
            }
        });
};
exports.signUp = (req, res, next) => {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
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
                    .then(function (user) {
                        MailTrasnporter.sendMail({ to: user.email });
                        authenticate({ id: user.id, email: user.email }, req, res);
                    }).catch(function (err) {
                        res.json([]);
                    });
            }
        });
};

exports.signOut = (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('authenticated');
    res.json({});
};

exports.ensureSignedIn = (req, res, next) => {
    jwt.verify(req.cookies.access_token, jwtSecret, (err, user) => {
        if (err) {
            return res.json({});
        }

        req.user = user;

        next();
    });
};

exports.ensureSignedOut = (req, res, next) => {
    if (req.cookies.access_token) {
        return res.json({});
    }
    next();
};
