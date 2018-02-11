'use strict';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "mailtesting11022018@gmail.com",
        pass: "mailtesting"
    }
});

var detalultMailOptions = {
    from: '<mailtesting11022018@gmail.com>',
    to: 'hninnayecho@gmail.com',
    subject: 'Suceess Signin',
    text: "Hello",
    html: "<b>HELLO, SignIn Success!!!!</b>"
};

var alertMailOptions = {
    from: '<mailtesting11022018@gmail.com>',
    to: 'hninnayecho@gmail.com',
    subject: 'EndDate is near',
    text: "Hi! Your dueDate is tomorrow",
    html: "<b>Are you already finished!</b>"
};


module.exports.sendMail = function(opts){
    //let mailOptions = {...defaultMailOptions, ... opts};
    let mailOptions = Object.assign( {}, detalultMailOptions, opts );
    console.log(JSON.stringify(mailOptions)+"  *****");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: " + info.response);
    });
}

module.exports.sendAlertMail = function(opts){
    //let mailOptions = {...defaultMailOptions, ... opts};
    let mailOptions = Object.assign( {}, alertMailOptions, opts );
    console.log(JSON.stringify(mailOptions)+"  *****");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: " + info.response);
    });
}