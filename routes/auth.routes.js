const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel"); 

// GET - Login Page

// POST - Register Page
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body;
    try{
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});

module.exports = router;