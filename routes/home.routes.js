const express = require('express');
const router = express.Router();

// GET Home
router.get("/", async(req, res) => {
    try{
        const user = req.user;
        res.render('home.ejs', {
            display: user,
        });
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});
// mongodb+srv://admin-shri:yPvk6QIA2OgnMIgm@cluster0.rc4y9.mongodb.net/tourntravelDB?retryWrites=true&w=majority

module.exports = router;