//auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{
//extract jwd token first ..
const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");

if(!token || token==undefined){
    return res.json({
        msg:"token missing brother ..",
        status:false
    });
}

//verify the token 
try{
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    

    req.userexist = payload;
}catch(error){
    res.json({
        msg:"token is invalid brother..."
    })
}


next();
    } catch(error){
        return res.json({
            msg:"something went wrong while verify the token"
        })
    }
   
}



//for student  role 

exports.isStudent=(req,res,next)=>{
    try{
        if(req.userexist.role !== "Student"){
            return res.json({
                msg:"this is the protected route for students only ",
                status:false
            })
        }
        next();
    }catch(error){
return res.json({
    status:false,
    msg:"User role is not matching brother .."
})
    }
}


//for Admin role..

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.userexist.role !== "Admin"){
            return res.json({
                msg:"this is the protected route for Admin only ",
                status:false
            })
        }
        next();
    }catch(error){
return res.json({
    status:false,
    msg:"User role is not matching brother .."
})
    }
}
