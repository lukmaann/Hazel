import { Link } from "react-router-dom";
import year from "../../helper/date";
import Styles from "../../styles/username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { userValidate } from "../../helper/validate";
import { useAuthStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Style from "./loginpages.module.css"

const Username = () => {
  const setUsername = useAuthStore((state) => state.setUsername);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      setUsername(value.username);
      navigate("/password");
    },
  });

  return (
    <div >
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>
      <div className="flex items-center justify-center h-screen ">
        <div
          className={`${Styles.glass} ${Style.logincontainer} `}
        >
          <div className="title flex flex-col items-center">
            <img src={logo} className="text-3xl font-bold w-[200px]" />
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Your Social Sphere Awaits!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input
                type="text"
                {...formik.getFieldProps("username")}
                id="username"
                className={Styles.textbox}
                autoComplete="OFF"
                placeholder="Username"
              />
              <button className={Styles.btn} type="submit">
                Lets Go{" "}
              </button>
            </div>
            <div className="text-center  mt-32 bg-black rounded-xl py-1 w-[70%] mx-auto text-white">
              <span>
                Not a Member?
                <Link to="/register" className=" text-red-500 px-2 hover:underline  font-bold">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div>
          <div className={`${Styles.home} relative flex max-sm:hidden`}>
          
      
            <button className=" absolute rounded-sm  text-white px-2 bottom-2 right-2    hover:underline">
              {" "}
             
              About Us ↗
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">
      ©{year} LVG Developments  ||  All right reserved
         
      </footer>
    </div>
  );
};

export default Username;
