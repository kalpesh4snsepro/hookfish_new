var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', requireAuth,function(req, res, next) {
	req = this.req;
	console.log('user index called');
	// console.log(req.isAuthenticated())
	//res.render('users', { title: 'Express' });
 
});

function requireAuth(req, res, next){

  	res.send(req.isAuthenticated()?'yes':'noe');

  	console.log(req.isAuthenticated()?'yes':'noe');

  // check if the user is logged in
  if(!req.isAuthenticated()){
    req.session.messages = "You need to login to view this page";
    //res.redirect('/login');
  }else{
  	console.log('logged in')
  }
  next();
}

module.exports = router;
