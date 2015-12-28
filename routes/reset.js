//require('../initialize.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

var common = require('../app/common.js');
// load up the user model
var User = require('../app/models/user');

router.get('/validate', function(req, res, next) {

    // res.send("in reset get action");

    if (typeof req.query.email != 'undefined' && typeof req.query.token != 'undefined') {
        console.log(req.query);
        
        //sanitize request query  
        common.sanitizeRequestBody(req, req.query);
        var encryptedEmail = req.query.email;

        //decrypt email and validate
        var decryptedEmail = common.decrypt(encryptedEmail);
        res.send("descryped email->" + decryptedEmail);

        User.findOne({
            email: decryptedEmail
        }, function(err, user) {

            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {

                console.log(user);
                console.log('Link validated');
                //redirect to reset password page

            } else {
                console.log('Invalid link');
                //redirect error page showing invalid link
            }

        });


    }

});

// process the signup form
router.post('/', function(req, res, next) {

    console.log(req.body);

    common.sanitizeRequestBody(req, req.body);
    //validate email format

    req.checkBody("email", "Enter a valid email address.").notEmpty().isEmail();
    req.checkBody("password", "password must be min 3 and max 8 allowed.").notEmpty().isAlphanumeric().isLength(3, 8);
    req.checkBody("confirm_password", "password must be min 3 and max 8 allowed.").notEmpty().isAlphanumeric().isLength(3, 8);

    if (req.body.password != req.body.confirm_password) {
        console.log('Confirm Password doesnt matched');
        return false;
    }

    var validationErrors = req.validationErrors();
    if (validationErrors) {

        console.log("Validation Errors");
        console.log(errors);
        res.send(errors);
        return;
    } else {
        var email = req.body.email;

        User.findOne({
            email: email
        }, function(err, user) {

            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
            	
            	var new_password = req.body.password;
            	var hash_password = user.generateHash(new_password);
            	user.password = hash_password;
            	user.reset_token = '';
            	var update_flag = user.save();
            	if(update_flag){

                	console.log('Link validated');
                	console.log("new password has been set successfully");
                	console.log("new password"+new_password+"____hash password=>"+hash_password);

            	}else{
            		console.log("Password couldnt be updated");
            	}

            } else {
                console.log('Invalid link');
                //redirect error page showing invalid link
            }

        });
    }


    return;

    passport.authenticate('local-reset', function(err, loginUser, info) {

        console.log("in reset body");
        console.log(err);
        console.log(loginUser);
        console.log(info);
    })(req, res, next);

    /*successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages*/
});

module.exports = router;