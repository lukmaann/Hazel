import  mongoose from "mongoose";



export const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:String,
    lastName:String,
    mobile:Number,
    profile:String,
    address:String

});




export default mongoose.model.Users || mongoose.model("User",UserSchema);