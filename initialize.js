module.exports = function() {
	
	var express = require('express');
	var router = express.Router();
	var passport = require('passport');

	require('../config/passport')(passport); // pass passport for configuration

}