import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()


const app=express();

app.listen(3000,()=>{
    console.log("sever connected at port 3000");
    console.log(process.env.NAME);
})