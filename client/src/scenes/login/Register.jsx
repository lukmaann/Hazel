import year from "../../helper/date";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/profile2.png";
import Styles from "../../styles/username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import { useState } from "react";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/helper";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from "../../assets/logo.png"

const Register = () => {
  const [showPassword,setShowPassword]=useState("password")
  const navigate = useNavigate();

  const [isDisabled,setDisable]=useState(false)

  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      value = await Object.assign(value, { profile: file || "" });
      let registerPromise = registerUser(value);
      setDisable(true)
      toast
        .promise(registerPromise, {
          loading: "creating user",
          success: "User registered please log In",

          error: "cant Register right now",
        })
        .then(() => {
          navigate("/");
        });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    // console.log(base64)
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="bottom-right"
        reverseOrder={false}
      ></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
          <img src={logo} className="text-3xl font-bold w-[200px]" />

            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Happy to join you
            </span>
          </div>
          <form className="py-1 w-72" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={Styles.profile_img}
                  src={file || Avatar}
                  alt="Avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id="profile" className="" />
             
            </div>
            
              
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={`w-[78%] ${Styles.textbox}`}
                autoComplete="OFF"
                placeholder="Email"
              />
              <input
                type="text"
                {...formik.getFieldProps("username")}
                className={`${Styles.textbox} w-[78%] `}
                autoComplete="OFF"
                placeholder="Username"
              />
              <div className="flex w-[78%] relative">
              <input
                type={showPassword}
                {...formik.getFieldProps("password")}
                className={`w-full ${Styles.textbox}`}
                autoComplete="OFF"
                placeholder="Password"
              />
              <span className="absolute right-2 mt-2 " onClick={()=>{setShowPassword(showPassword==="password"?"text":"password")} }> {showPassword==="password"?<VisibilityIcon/>:<VisibilityOffIcon/>}</span>
            </div>

              <button className={`${Styles.btn} disabled:cursor-not-allowed disabled:opacity-40 w-[78%] bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500`} type="submit"  disabled={isDisabled}>
                Register
              </button>
            </div>
            <div className="text-center py-10">
              <span>
                Already a Member?
                <Link to="/" className=" px-2 text-red-500 font-medium">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">
        ©{year} Lukn Developments || All right reserved
      </footer>
    </div>
  );
};

export default Register;
