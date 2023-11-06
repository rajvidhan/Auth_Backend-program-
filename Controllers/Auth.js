const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.signup = async (req,res)=>{
try{
    const {name,email,password,role} = req.body;


    //usernamecheck 
    const usernameCheck = await User.findOne({name});
    if(usernameCheck)
    return res.json({
          msg:"Username already used..",
          status:false
    });
   

    //Email check..
    const emailCheck = await User.findOne({email});
    if(emailCheck)
    return res.json({
        msg:"Email is already used..",
        status:false
    })

    //hashing the password
    const hashedpassword = await bcrypt.hash(password,10);

 //create a user document object ..
    const user = await User.create({
        email,
        name,
       role,
        password:hashedpassword
    });


    //delete the user password for authentication..
    delete user.password;


    return res.json({
        status:true,
        user,
        msg:"user created successfully brother"
    })



}
catch(err){
   return res.json({
    status:false,
    msg:"there is a error in controler of signup brother "
   })
}

 
}



//for login
exports.login= async (req,res)=>{
    try{
        const {name, password} = req.body;


        //first we check the user is exist or not ..
       let userexist = await User.findOne({name});
        if(!userexist){
            return res.json({
                msg:"Incorrect username and password.."
            })
        }


        //now we have to check the password is valid or not 
        
        const ispasswordvalid = await bcrypt.compare(password,userexist .password);
       const payload ={
        email:userexist.email,
        id:userexist._id,
        role:userexist.role,
       }

        if(!ispasswordvalid){
            return res.json({
                msg:"Incorrect username and password you hav to sign up first "
            });
        }
        else{
            let token = jwt.sign(payload,
                              process.env.JWT_SECRET,
                              {
                                expiresIn:"2h",
                              });


                              userexist= userexist.toObject();
                              userexist.token = token;
                              userexist.password = undefined;


                              const options ={
                                expires: new Date(Date.now()+30000),
                                httpOnly:true,
                              }

                              res.cookie("token",token,options).status(200).json({
                                success:true,
                                token,
                                userexist,
                                msg:"user loged in brother .."
                              });
                           
        }
    }
    catch(err){
        console.log(err);
        res.json({
            msg:"login failure brother..",
           
            
        })
    }
}