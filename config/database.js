const mongoose= require("mongoose");
require("dotenv").config();


exports.connectWithdb = ()=>
mongoose.connect("mongodb://0.0.0.0:27017/Auth")
.then(()=> console.log("hello connect ho gya hu bhai panda 🐻"))
.catch((err)=> console.log("nhi hu bhai dekhle connect or ye dekh error "+ " "+ err));
