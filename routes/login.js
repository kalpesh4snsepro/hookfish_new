//require('../initialize.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

// process the login form
router.post('/', function(req, res,next) {

	//res.send("In post login action");
	//var loginUser = req.body;
    
    console.log("In post login action");
   // console.log(loginUser);

    passport.authenticate('local-login', function(err, loginUser,info) {
    	
    	console.log("in authenticate body");
    	console.log(err);
        //console.log(loginUser);
        
    })(req, res, next);

    /*successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages*/
});

module.exports = router;