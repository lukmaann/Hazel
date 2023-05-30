import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectdb=async ()=>{
 const connection=await mongoose.connect(process.env.MONGOURI);
 return connection;
}

export default connectdb;