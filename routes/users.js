const express = require('express');
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');

const { renderRegisterPOST, loginPOST, logout } = require("../controllers/users_controllers");

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post("/register", renderRegisterPOST);

// Login
router.post("/login", loginPOST);

// Logout
router.get("/logout", logout);

module.exports = router;
