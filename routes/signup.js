//require('../initialize.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
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
    res.send('signup get actidfgdfon');
});

router.post('/', function(req, res, next) {
    var newUser = req.body;
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

});

module.exports = router;