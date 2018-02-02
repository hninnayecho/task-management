var models = require("../models");
//var passport = require("../../config/passport");
module.exports = {

  login: function (req, res, next) {
    models.User
      .findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
      .then(function (user) {
          if(user){
            console.log('api/login route entered222');
            var email = req.body.email;
            var password = req.body.password;
            console.log('email is ' + email);
            console.log('password is ' + password);
              const options = req.body.remember ? {
                maxAge: 30 * 24 * 60 * 60 * 1000,
              } : {};
              res.cookie('authenticated', true, options);
              res.json({});
          }else{
            console.log('>>>>>>>>> not authenticated');
            // don't do this in real project
            res.json({});
          }
      });
  }
};
