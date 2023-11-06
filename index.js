const express = require("express")
 
const app = express();
require('dotenv').config();
app.use(express.json());
require("./config/database").connectWithdb();



const cookieParser = require("cookie-parser");
app.use(cookieParser());


// route import and mount
const userroute = require("./Routes/user");
app.use("/api/v1",userroute);




app.listen(process.env.PORT,()=>{
    console.log("the server is running well 🕺..")
})
