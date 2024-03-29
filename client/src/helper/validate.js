import { toast } from "react-hot-toast"
import {authenticate} from "./helper"

export const userValidate=async (values)=>{
    const errors=usernameVerify({},values);

    if(values.username && values.username!=="admin101" ){
        
        const {status}=await authenticate(values.username);
        if(   status!=200){
            errors.exists=toast.error("No User Found please Register")
        }

    }
    return errors
}
const usernameVerify=(error={},value)=>{
    if(!value.username){
        error.username=toast.error("Please Enter Username")
    }else if(value.username.includes(" ")){
        error.username=toast.error("invalid username")
    }

    return error

}



export const passwordValidate=async (values)=>{
    const errors=passwordverify({},values);
    return errors
}

const passwordverify=(errors={},values)=>{
    if(!values.password){
        errors.password=toast.error("required password !!")
    }else if(values.password.includes(" ")){
        errors.password=toast.error("invalid password")
    }else if(values.password.length<5){
        errors.password=toast.error("long pasword needed")
    }

    return errors
}


export const resetPasswordValidation=async (values)=>{
    const errors=passwordverify({},values);
    if(values.password!=values.confirm_pwd){
        errors.exist=toast.error("Password Mis-Match")
    }
}

export const profileValidation=async (values)=>{
    const errors=emailverify({},values);
    return errors
}

export const registerValidation=async (values)=>{
    const errors=usernameVerify({},values);
    passwordverify(errors,values),
    emailverify(errors,values)

    return errors
}


const emailverify=(errors={},value)=>{
    if(!value.email){
        errors.email=toast.error("required email");
    }else if(value.email.includes(" ")){
        errors.email=toast.error("Invalid email");
    }else if( ! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.email)){
        errors.email=toast.error("invalid email");
    }

    return errors
}

export const editProfileValidation=async (values)=>{
    const errors=emailverify({},values);
    mobileNumberVerify(errors,values)
    
    return errors
}

export const mobileNumberVerify=(errors={},value)=>{
    if(! /^([+]\d{2}[ ])?\d{10}$/.test(value.mobile)){
        errors.mobile=toast.error("invalid mobile number")
    }
}


export const reportVerify=(error={},value)=>{
    if(!value.reporttext){
       error.reporttext= toast.error("enter the content")
    }
}

export const reportValidation=async(value)=>{
    const errors=reportVerify({},value);
    return errors
}