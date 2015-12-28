var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.protocol + '://' + req.get('host')+'/app/assests/js/index.js');
	//res.end();
   res.render('landing.ejs', { message: req.flash('signupMessage') });
});




module.exports = router;
