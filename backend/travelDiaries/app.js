const express = require("express");
const mongoose = require("mongoose");   
const dotenv=require("dotenv");

const app=express();
dotenv.config();

mongoose.connect("mongodb+srv://admin:X2IsnfJ6UhxVa5N2@cluster0.mpp4dfz.mongodb.net/?retryWrites=true&w=majority")
.then(()=>app.listen(5000,()=>console.log("connection successfull")))
.catch((err)=>console.log(err));
app.use("/",(req,res,next)=>{
    res.send("hai");
})

