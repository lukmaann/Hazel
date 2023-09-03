import Avatar from "../../assets/profile.png";
import year from "../../helper/date";
import Styles from "../../styles/username.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import Style from "./loginpages.module.css"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// -------------------------store data and custom hooks------------
import { useAuthStore, usePostStore } from "../../store/store";
import { useUserStore } from "../../store/store";
import useFecth from "../../hooks/fecth.hooks";
import usePostFecth from "../../hooks/fecthpost.hooks";

// ------------------------------helpers------------------
import { passwordValidate } from "../../helper/validate";
import { loginUser } from "../../helper/helper";

const Password = () => {
  const [showPassword,setShowPassword]=useState("password")
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const setPosts=usePostStore((state)=>state.setPosts)
  const [{ isLoading, apiData, serverError }] = useFecth(`user/${username}`);
  const [{postData}]=usePostFecth()
  // const [isDisabled,setDisable]=useState(false)
 

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      const loginPromise = loginUser({ username, password: value.password });
      // setDisable(true)

      loginPromise.then(async (res) => {
        let { token } = res;
        localStorage.setItem("token", token);
        setUser(apiData);
        await setPosts(postData)
        navigate("/explore")

      
      });
      toast.promise(loginPromise, {
        loading: "Checking Credentials",
        success: "logged in ",
        error: "Invalid Password",
      });
    },
  });

  if (isLoading)
    return <h1 className="flex justify-center p-10"></h1>;
  if (serverError) return <h1>{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="bottom-right"
        reverseOrder={false}
      ></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={`${Styles.glass} ${Style.logincontainer}  border-none rounded-lg`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl  font-bold capitalize  ">
              {" "}
              {apiData?.username}
            </h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Welcome Back!!
            </span>
          </div>
          <form className="py-1 w-72" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className={Styles.profile_img}
                src={apiData?.profile || Avatar}
                alt="Avatar"
              />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
            <div className="flex w-[78%] relative">
            <input
                type={showPassword}
                {...formik.getFieldProps("password")}
                className={`w-[100%]  ${Styles.textbox}`}
                autoComplete="OFF"
                placeholder="Password"
              />
              <span className="absolute right-2 mt-2 " onClick={()=>{setShowPassword(showPassword==="password"?"text":"password")} }> {showPassword==="password"?<VisibilityIcon/>:<VisibilityOffIcon/>}</span>
            </div>
              <button className={`${Styles.btn} w-[78%] mx-2`} type="submit">
                Login
              </button>
            </div>
            <div className="text-center py-10">
              <span>
                Forgot password?
                <Link to="/recovery" className=" px-2 text-red-500 font-medium">
                  lets recover
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">
        ©{year} Lukn Developments|| All right reserved
      </footer>
    </div>
  );
};

export default Password;
