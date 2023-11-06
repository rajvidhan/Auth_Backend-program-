const express = require("express");
const router = express.Router();
const {login,signup} = require("../Controllers/Auth");
const {auth,isStudent, isAdmin} = require("../middlewares/auth")

//protectd routes

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected route for students"
    })
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected route for admin brother..."
    })
})

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        msg:"welcome to the protected route for test brother "
    })
})



router.post("/login",login);
router.post("/signup",signup);

module.exports = router;