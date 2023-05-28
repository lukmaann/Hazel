import { toast } from "react-hot-toast";


export const userValidate=async (values)=>{
    const errors=usernameVerify({},values);
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