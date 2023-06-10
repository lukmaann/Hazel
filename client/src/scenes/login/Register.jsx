import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/profile.png";
import Styles from "../../styles/username.module.css";
import {Toaster, toast} from "react-hot-toast";
import {useFormik} from "formik"
import { registerValidation } from "../../helper/validate";
import { useState } from "react";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/helper";

const d = new Date();
let year = d.getFullYear();


const Register = () => {
  const navigate=useNavigate();

  const [file,setFile]=useState()
const formik=useFormik({
  initialValues:{
    email:'',
    username:"",
    password:'',
  },
  validate:registerValidation,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    value=await Object.assign(value,{profile:file || ""}) 
    let registerPromise=registerUser(value);
    toast.promise(registerPromise,{
      loading:"creating user",
      success:"User registered please log In",
      
      error:"cant Register right now"
    }).then(()=>{
      navigate("/")
    })
    

  
    console.log(value);
  }
})

const onUpload=async (e)=>{
  const base64= await convertToBase64(e.target.files[0])
  // console.log(base64)
  setFile(base64)
}

  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-pink-400">Hazel!</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Happy to join you
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
            <img className={Styles.profile_img} src={file || Avatar} alt="Avatar" />


            </label>
            <input onChange={onUpload}  type="file" id="profile"/>
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="email" {...formik.getFieldProps("email")} className={Styles.textbox} autoComplete="OFF" placeholder="Email" />
              <input type="text" {...formik.getFieldProps("username")} className={Styles.textbox} autoComplete="OFF" placeholder="Username" />
              <input type="password" {...formik.getFieldProps("password")} className={Styles.textbox} autoComplete="OFF" placeholder="password" />

              <button className={Styles.btn}  type="submit">Register</button>
            </div>
            <div className="text-center py-10">
              <span >
                Already a Member? 
                <Link to="/" className=" px-2 text-red-500 font-medium">
                   Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">©{year} Lukn Developments || All right reserved</footer>
    </div>
  );
};

export default Register;
