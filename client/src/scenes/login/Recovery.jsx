import year from "../../helper/date";
import Styles from "../../styles/username.module.css";
import {Toaster, toast} from "react-hot-toast";
import {useFormik} from "formik"
import { passwordValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import { useEffect, useState } from "react";
import { genrateOtp, verifyOtp } from "../../helper/helper";
import {useNavigate} from "react-router-dom"
import Style from "./loginpages.module.css"




const Recovery = () => {
  const navigate=useNavigate();
 const username=useAuthStore((state)=>state.auth.username)
//  console.log(username);
  const [Otp,setOtp]=useState();
  
  useEffect(()=>{
   genrateOtp(username).then((otp)=>{
    if(otp) return toast.success("OTP sent to your email");
    return toast.error("cannot send OTP")
   })
 
  },[username])

  const onsubmit=async(e)=>{
    e.preventDefault();
    try {
      const {status}=await verifyOtp({username,code:Otp})
    if(status===201){
      navigate("/reset")
      toast.success("verified Otp");
    }
   
    } catch (error) {
      return toast.error("wrong otp")
      
    }
  }
const formik=useFormik({
  initialValues:{
    password:''
  },
  validate:passwordValidate,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    console.log(value);
  }
})

const resendOtp=()=>{
  const otppromise=genrateOtp(username);
  toast.promise(otppromise,{
    loading:"sending...",
    success:"otp sent",
    error:"cannot send otp"
  })
  otppromise.then((otp)=>{
    console.log(otp);
  })
}


  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={`${Styles.glass} ${Style.logincontainer} rounded-lg`}>
          <div className="title flex flex-col py-10 items-center">
            <h4 className="text-4xl font-bold ">Recover</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Enter 6 digit OTP sent to your email
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input onChange={(e)=>{setOtp(e.target.value)}} type="password" className={Styles.textbox} autoComplete="OFF" placeholder="OTP" />
              <button className={Styles.btn} onClick={onsubmit} type="submit">Reset</button>
            </div>
            <div className="text-center py-10">
            
            </div>
          </form>
          <span className="flex justify-center">
                Not got OTP? 
              <button className="text-red-500 px-4" onClick={resendOtp}>Resend</button>
              </span>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">©{year} Lukn Developments || All right reserved</footer>
    </div>
  );
};

export default Recovery;
