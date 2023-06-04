import { Link} from "react-router-dom";
import Avatar from "../assets/profile.png";
import Styles from "../styles/username.module.css";
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik"
import { userValidate } from "../helper/validate";
import { authenticate } from "../helper/helper";

const d = new Date();
let year = d.getFullYear();


const Username = () => {
const formik=useFormik({
  initialValues:{
    username:''
  },
  validate:userValidate,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    console.log(value);

    authenticate(value.username)
  }
})

  return (
    <div className="container p-10 mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-pink-400">Bourban!</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
            Your Social Sphere Awaits!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={Styles.profile_img} src={Avatar} alt="Avatar" />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="text" {...formik.getFieldProps("username")} className={Styles.textbox} autoComplete="OFF" placeholder="Username" />
              <button className={Styles.btn}   type="submit">Lets Go  </button>
            </div>
            <div className="text-center py-10">
              <span>
                Not a Member?
                <Link to="/register" className=" text-red-500 font-medium">
                  register
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

export default Username;
