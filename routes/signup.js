//require('../initialize.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
//var validator = require('express-validator');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// process the signup form
router.post('/hello', function(req, res) {

    /*successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages*/
});

router.get('/', function(req, res) {

    console.log('signup get actdfgdion');
    res.render('signup.ejs');
});

router.post('/', function(req, res, next) {
    var newUser = req.body;
    console.log('in post action');
    sanitizeReqBody(req,req.body);
    
    console.log(req.body);
    req.checkBody("email", "Enter a valid email address.").notEmpty().isEmail();
    req.checkBody("first_name", "Only characters allowed in first name.").notEmpty().isAlpha();
    req.checkBody("last_name", "Only characters allowed in last name.").isAlpha();

    req.checkBody("password", "password must be min 3 and max 8 allowed.").notEmpty().isLength(3,8);
    req.checkBody("password", "No special characters allowed in password.").isAlphanumeric();
    
    if(typeof req.body.user_type != 'undefined'){
        req.checkBody("user_type", "Invalid user_type").isIn(['customer', 'broker']);
    }    
    


    var errors = req.validationErrors();
    if (errors) {
    
        console.log(errors);
        res.send(errors);
        return;
    
    } else {
        console.log("no validation errors");
        passport.authenticate('local-signup', function(err, newUser, info) {

            console.log(err);
            console.log(newUser);
            console.log(info);

            // Generate a JSON response reflecting authentication status
            if (!newUser) {
                //done(null, false);
                //res.json({ message : 'authentication failed' });
                return res.send({
                    success: false,
                    message: 'email aleary exists'
                });
            }
            return res.send({
                success: false,
                message: 'signup done'
            });
            //done(null, user);
            //res.json({ message : 'authentication succeeded' });

            /*successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/signup', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
        */
        })(req, res, next);
    
    }


});

function sanitizeReqBody(req,reqBodyObj){
    
    Object.keys(reqBodyObj).forEach(function(key) {
        //console.log(key, reqBodyObj[key]);
        req.sanitize(key).trim();
    });
}

module.exports = router;