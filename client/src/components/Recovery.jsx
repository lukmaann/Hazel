
import Styles from "../styles/username.module.css";
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import { passwordValidate } from "../helper/validate";

const d = new Date();
let year = d.getFullYear();


const Recovery = () => {
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


  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col py-10 items-center">
            <h4 className="text-4xl font-bold text-pink-400">Recover</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Enter 6 digit OTP
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="password" className={Styles.textbox} autoComplete="OFF" placeholder="OTP" />
              <button className={Styles.btn}  type="submit">Reset</button>
            </div>
            <div className="text-center py-10">
              <span >
                Not got OTP? 
              <button className="text-red-500 px-4">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">©{year} Lukn Developments || All right reserved</footer>
    </div>
  );
};

export default Recovery;
