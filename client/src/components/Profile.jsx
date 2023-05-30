import { Link } from "react-router-dom";
import Avatar from "../assets/profile.png";
import Styles from "../styles/username.module.css";
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import { profileValidation } from "../helper/validate";
import { useState } from "react";
import convertToBase64 from "../helper/convert";

const d = new Date();
let year = d.getFullYear();


const Profile = () => {

  const [file,setFile]=useState()
const formik=useFormik({
  initialValues:{
    email:'',
    firstName:"",
    lastName:'',
    "mobile_no":"",
    "adress":""
  },
  validate:profileValidation,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    value=await Object.assign(value,{profile:file || ""}) 
  
    console.log(value);
  }
})

const onUpload=async (e)=>{
  const base64= await convertToBase64(e.target.files[0])
  console.log(base64)
  setFile(base64)
}

  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-pink-400">Profile</h4>
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
            <div className="flex name gap-10 w-3/4">
            <input type="text" {...formik.getFieldProps("FirstName")} className={Styles.textbox} autoComplete="OFF" placeholder="First Name" />
            <input type="text" {...formik.getFieldProps("LastName")} className={Styles.textbox} autoComplete="OFF" placeholder="Last Name" />


            </div>
            <div className="flex name gap-10 w-3/4">
            <input type="text" {...formik.getFieldProps("mobile_no")} className={Styles.textbox} autoComplete="OFF" placeholder="Mobile No" />
            <input type="text" {...formik.getFieldProps("email")} className={Styles.textbox} autoComplete="OFF" placeholder="Email" />


            </div>

              <input type="text" {...formik.getFieldProps("adress")} className={Styles.textbox} autoComplete="OFF" placeholder="Username" />

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

export default Profile;
