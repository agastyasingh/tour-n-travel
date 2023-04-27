const bcrypt = require('bcryptjs'); 
const passport = require('passport');

const User = require('../models/User');

// Register Page - POST
const renderRegisterPOST = async(req, res) => {
    const { name, email, password, password2, phone } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2 || !phone) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if(phone.length < 10){
        errors.push({ msg: 'Phone Number must be of 10 digits !!' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        phone
        });
    } else {
        User.findOne({ email: email }).then(user => {
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
            errors,
            name,
            email,
            password,
            phone,
            password2
            });
        } else {
            const newUser = new User({
            name,
            email,
            password,
            phone
            });

            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => {
                    req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
            });
        }
        });
    }
};

// Login Page - POST
const loginPOST = async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: `/home`,
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

// Logout Route
const logout = async(req, res) => {
    req.logout();
    res.redirect('/home');
};

module.exports = {
    renderRegisterPOST,
    loginPOST,
    logout
}