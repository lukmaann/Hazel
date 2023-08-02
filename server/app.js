import express from "express"
import mongoose, { connect } from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import connectdb from "./database/conn.js";
import router from "./Router/LoginRoutes.js";
import userRouter from "./Router/UserRoutes.js";
import postRouter from "./Router/PostRoutes.js"

dotenv.config()
const app=express();
app.use(bodyParser.urlencoded({extended:true, limit:"200mb"}));
app.use(bodyParser.json({extended:true, limit:'200mb'}));
app.use(express.json());

app.use(cors())
app.disable('x-powered-by')




app.get("/",(req,res)=>{
    res.status(201).json("hello")
})

app.use('/api',router)
app.use('/api',userRouter)
app.use('/api',postRouter)

connectdb().then(()=>{
    app.listen(process.env.PORT || 3000 ,()=>console.log("server connected to db and started "))
})
