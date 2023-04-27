const GoogleStrategy = require('passport-google-oauth20').Strategy;

// User Model import
const User = require("../models/User");

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://zakk-todoapp.herokuapp.com/auth/google/dashboard"
        // callbackURL: "http://localhost:3000/auth/google/dashboard"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOne({
          googleId: profile.id 
          }, function(err, user) {
          if (err) {
              return cb(err, false)
          }
          if (!user) {
              user = new User({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  username: profile.emails[0].value,
                  googleId: profile.id
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return cb(err, user);
              });
          } else {
              return cb(err, user);
          }
      });
      }
    ));
};