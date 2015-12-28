//require('../initialize.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

var nodemailer = require("nodemailer");
var common = require('../app/common.js');
var User = require('../app/models/user');

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        XOAuth2: {
            user: "kalpesh4.snsepro@gmail.com", // Your gmail address.
            // Not @developer.gserviceaccount.com
            /*clientId: "01121103957-tgephibsi4iopbn18ck2edrus444slfk.apps.googleusercontent.com",
            clientSecret: "YipbIxsyRA4tqR1zRQLe8tA3",
            refreshToken: "1/YIjaqLx327YNGaJNdAl1R3gfnVf3GnSk08M1jvRUsT0"*/

            clientId: "201121103957-l4qje27i5n5sqjm2m5md6ncg5tqm66gg.apps.googleusercontent.com",
            clientSecret: "l-8LdsvJaOVFFm_CODcVmfHz",
            refreshToken: "1/thMnJlXcs3zDfB7GYzH-bXjPIx8ZigD_JD8AOzD6oyQ"
        }
    },
    // debug: true
});

router.post('/', function(req, res, next) {

    console.log('before forgot_new passport');
    console.log(req.body);

    passport.authenticate('local-login_new', function(err, User, info) {

        console.log("after forgot_new passport");
        console.log(err);
        //console.log(User);

    })(req, res, next);

    /*successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages*/
});

router.post('/send', function(req, res, next) {

    console.log('before send post');
    console.log(req.body);

    if (typeof req.body.email != 'undefined') {

        //validate email format
        req.checkBody("email", "Enter a valid email address.").notEmpty().isEmail();
        var validationErrors = req.validationErrors();
        if (validationErrors) {

            console.log("Invalid Email ");
            console.log(errors);
            res.send(errors);
            return;
        }

        //sanitize request body  
        common.sanitizeRequestBody(req, req.body);

        //generate password reset token for email found and update same to that row into database
        var resetToken = common.generateResetToken();

        User.findOne({
            email: req.body.email
        }, function(err, updateUser) {

            console.log("before update=>" + updateUser);
            if (updateUser) {

                //update reset token for every forgot password request
                updateUser.reset_token = resetToken;
                var save_flag = updateUser.save();

                if (save_flag) {

                    console.log("after update=>" + updateUser);

                    var email = req.body.email;
                    var resetUrl = req.protocol + '://' + req.get('host') + '/reset/validate?temp=1';
                    var encryptedEmail = common.encrypt(email);
                    console.log('enc email->' + encryptedEmail);

                    resetUrl = resetUrl + '&email=' + encryptedEmail;
                    resetUrl = resetUrl + '&token=' + resetToken;
                    //resetUrl = resetUrl+'&token='+resetToken;

                    console.log('final reset link=>' + resetUrl);

                    //keep left as its not working
                    passport.authenticate('local-forgott', function(err, verifiedUser, info) {

                    })

                    var mailOptions = {
                        from: "kalpesh4.snsepro@gmail.com",
                        to: email,
                        subject: "Hookfish Forgot Password",
                        //generateTextFromHTML: true,
                        html: "<b>Hello User,</b><p><center>This is mail sent from hookfish.in regarding forgot password.</center><p><p><center><a href='" + resetUrl + "' >Click here</a> to reset your password</center><p><p><div style='float:left;'>Thanks & regards,<br>Hoofish Team<p>",
                        text: "Hello world",
                    };

                    smtpTransport.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email to ' + email + ' for forgot password is sent.');
                            console.log(response);
                        }
                        smtpTransport.close();
                    });

                } else {
                    console.log("Reset password couldnt be updated.")
                }

            } else {
                console.log("Email doesnt exist.");
            }

        });

    } else {
        console.log('No "email" field in request body.');
    }

});

router.post('/temp', function(req, res, next) {

    // var post_data = req.body;
    console.log('before forgot passport');
    console.log(req.body);

    passport.authenticate('local-forgot', function(err, post_data, info) {

        console.log('after forgot passport');
        console.log(post_data);
        return;



        var mailOptions = {
            from: "kalpesh4.snsepro@gmail.com",
            to: "kalpesh4marathe@gmail.com",
            subject: "Sample email sent from Nodemailer",
            generateTextFromHTML: true,
            html: "<b>Hello world</b><p><center>This is mail sent from node mailer example</center><p>",
            //text: "Hello world",
        };

        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
            smtpTransport.close();
        });


    })(req, res, next);;




});


router.get('/', function(req, res, next) {

    //res.send("In post login action");
    var loginUser = req.body;
    passport.authenticate('local-forgot', function(err, loginUser, info) {

        console.log("in authenticate body");
        console.log(err);
        console.log(loginUser);
        console.log(info);
    })(req, res, next);;

    /*successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages*/
});

module.exports = router;