import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../assets/profile.png";
import Styles from "../../styles/username.module.css";
import {Toaster, toast} from "react-hot-toast";
import {useFormik} from "formik"
import { passwordValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import useFecth from "../../hooks/fecth.hooks";
import { loginUser } from "../../helper/helper";
const d = new Date();
let year = d.getFullYear();


const Password = () => {
  
  
  const navigate=useNavigate();
  const username=useAuthStore(state=>state.auth.username)
  const [{isLoading,apiData,serverError}]=useFecth(`user/${username}`);

  



  
const formik=useFormik({
  initialValues:{
    password:''
  },
  validate:passwordValidate,

  validateOnBlur:false,
  validateOnChange:false,
  onSubmit:async value=>{
    console.log(value);
    const loginPromise= loginUser({username,password:value.password})
  

    loginPromise.then(res=>{
      let {token}=res;
      localStorage.setItem("token",token)
      navigate('/editprofile')
      
    })
    toast.promise(loginPromise,{
      loading:"loading",
      success:"loggedd in ",
      error:"Password not match"
    })
  }
})


if(isLoading)  return <h1 className="flex justify-center p-10">Loading...</h1>
if(serverError) return <h1>{serverError.message}</h1>


  return (
    <div className="container mx-auto">
    <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-pink-400"> {apiData?.username}</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Glad You are Back!!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={Styles.profile_img} src={apiData?.profile||Avatar} alt="Avatar" />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input type="password" {...formik.getFieldProps("password")} className={Styles.textbox} autoComplete="OFF" placeholder="Password" />
              <button className={Styles.btn}  type="submit">Login</button>
            </div>
            <div className="text-center py-10">
              <span >
                Forgot password? 
                <Link to="/recovery" className=" px-2 text-red-500 font-medium">
                   lets recover
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

export default Password;
