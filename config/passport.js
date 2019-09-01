var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { User } = require('../app/models/mysql');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  
  User.findOne({ where: {email: email} }).then(user => {
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
  
}));

