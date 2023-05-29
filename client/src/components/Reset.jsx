
import Styles from "../styles/username.module.css";
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import { resetPasswordValidation } from "../helper/validate";

const d = new Date();
let year = d.getFullYear();


const Password = () => {
const formik=useFormik({
  initialValues:{
    password:'',
    confirm_pwd:""
  },
  validate:resetPasswordValidation,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    console.log(value);
  }
})


  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass} >
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-pink-400">Reset</h4>
         
          </div>
          <span className="text-center text-gray-400 text-lg flex justify-center">Enter new password</span>
          <form className="py-1" onSubmit={formik.handleSubmit}>
       
            <div className="textbox flex flex-col justify-center  py-20 items-center gap-3">
            <input type="password" {...formik.getFieldProps("password")} className={Styles.textbox} autoComplete="OFF" placeholder="New Password" />

              <input type="text" {...formik.getFieldProps("confirm_pwd")} className={Styles.textbox} autoComplete="OFF" placeholder=" Confirm Password" />
              <button className={Styles.btn}   type="submit">Reset</button>
            </div>
           
           
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">©{year} Lukn Developments || All right reserved</footer>
    </div>
  );
};

export default Password;
