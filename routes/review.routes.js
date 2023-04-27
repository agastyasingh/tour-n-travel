const express = require('express');
const router = express.Router();

// GET Home
router.get("/", async(req, res) => {
    try{
        const user = req.user;
        res.render('review', {
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

module.exports = router;