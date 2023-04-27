const express = require('express');
const router = express.Router();

const mailer = require("../config/mailer");

// GET Home
router.get("/", async(req, res) => {
    try{
        const user = req.user;
        // req.flash(
        //     'success_msg',
        //     'Done'
        // );
        res.render('contact', {
            display: user
        });
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});

router.post("/", async(req, res) => {
    const {name, email, phone, subject, message} = req.body;
    try{    
        mailer.sendAnEmail(email, subject, name);
        res.redirect("/contact");
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
   
});

module.exports = router;