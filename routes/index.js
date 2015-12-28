var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/apicall', function(req, res, next) {
  
  res.json({ message : 'Api called in index ' });

});

module.exports = router;
