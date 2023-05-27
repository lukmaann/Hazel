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