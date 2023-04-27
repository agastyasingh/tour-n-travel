const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/auth');
const passport = require("passport");

// "/" default route items

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// google oauth routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/dashboard', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// "/" default route end

module.exports = router;
