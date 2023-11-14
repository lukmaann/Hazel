/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import year from "../../helper/date";
import Styles from "../../styles/username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { userValidate } from "../../helper/validate";
import { useAuthStore, useUserStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Style from "./loginpages.module.css";
import useFecth from "../../hooks/fecth.hooks";
import { useEffect, useState } from "react";
import { LoadServer, loginUser } from "../../helper/helper";
import Badge from "@mui/material/Badge";

const Username = () => {
  const setUsername = useAuthStore((state) => state.setUsername);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const [isDisabled, setDisable] = useState(false);
  const [serverloded, setserverloded] = useState(true);

  
  

  const [{ apiData }] = useFecth(`user/HELLOGUEST`);
  const guestlogin = () => {
    const loginPromise = loginUser({
      username: "HELLOGUEST",
      password: "helloguest",
    });

    toast.promise(loginPromise, {
      loading: "LOGGING IN AS GUEST",
      success: "WELCOME GUEST",
      error: "error",
    });

    loginPromise.then(async (res) => {
      let { token } = res;
      localStorage.setItem("token", token);

      setUser(apiData);
      navigate("/explore");
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      if (value.username === "admin101") {
        navigate("/admin");
      } else {
        setUsername(value.username);
        setDisable(true);
        navigate("/password");
      }
    },
  });

  return (
    <div className="container mx-auto  ">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="bottom-right"
        reverseOrder={false}
      ></Toaster>
      <div className="flex max-w-full items-center justify-center h-screen ">
        <div className={`${Styles.glass} ${Style.logincontainer} `}>
          <div className="title flex flex-col items-center">
            <img src={logo} className="text-3xl font-bold w-[200px]" />
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Your Social Sphere Awaits!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4"></div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input
                type="text"
                {...formik.getFieldProps("username")}
                id="username"
                className={Styles.textbox}
                autoComplete="OFF"
                placeholder="Username"
              />
              <button
                className={`${Styles.btn} disabled:cursor-wait bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 `}
                type="submit"
                disabled={isDisabled}
              >
                Lets Go{" "}
              </button>
            </div>
            <div className="text-center  mt-20 bg-black rounded-xl py-1 w-[70%] mx-auto text-white">
              <span>
                Not a Member?
                <Link
                  to="/register"
                  className=" text-red-500 px-2 hover:underline  font-bold"
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
          <div className="w-[100%] flex mt-4  justify-center">
            <Badge color="secondary" badgeContent="Try">
              <button
                className="p-2 border border-black disabled:cursor-not-allowed disabled:opacity-30 text-sm rounded-lg shadow-lg hover:cursor-pointer "
                onClick={guestlogin}
                disabled={!serverloded}
              >
                Login As Guest
              </button>
            </Badge>
          </div>
        </div>
        <div>
          <div className={`${Styles.home} relative flex max-sm:hidden`}></div>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 m-auto py-2">
        ©{year} Lukn Developments || All right reserved
      </footer>
    </div>
  );
};

export default Username;
