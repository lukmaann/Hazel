import mongoose, { Mongoose } from "mongoose";


const adminSchema=mongoose.Schema({
    adminName:{
        type:String
    },
    password:{
        type:String
    }
})


const Admin=mongoose.model('admin',adminSchema);

export default Admin