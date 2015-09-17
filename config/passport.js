var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user').User;


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.usua_login);
    });

    passport.deserializeUser(function(username, done) {
       new User({usua_login: username}).fetch().then(function(user) {
          done(null, user);
       });
    });
    
    passport.use(new LocalStrategy(function(username, password, done) {
      console.log("passport");
       new User({usua_login: username}).fetch().then(function(data) {
          var user = data;
          if(user === null) {
             return done(null, false, {message: 'Invalid username or password'});
             console.log("error");
          } else {
             console.log("login"); 
             user = data.toJSON();
             if(password != user.usua_password) {
                return done(null, false, {message: 'Invalid username or password'});
             } else {
                return done(null, user);
             }
          }
       });
    }));

};