'use strict';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "frobo.test01@gmail.com",
        pass: "frobopassword"
    }
});

var detalultMailOptions = {
    from: '<frobo.test01@gmail.com>',
    to: 'hninnayecho@gmail.com',
    subject: 'Suceess Signin',
    text: "Hello",
    html: "<b>HELLO, SignIn Success!!!!</b>"
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


