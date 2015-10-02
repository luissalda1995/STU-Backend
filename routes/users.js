var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

module.exports = function(passport){
    // route to log in
    router.post('/login', passport.authenticate('local'), function(req, res) {
      res.send(req.user);
    });

    router.get('/loggedin', function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

    // route to log out
  	router.post('/logout', function(req, res){
  	  req.logOut();
  	  res.send(200);
  	});
    
    return router;

}