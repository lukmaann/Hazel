import Avatar from "../../assets/profile.png";
import year from "../../helper/date";
import Styles from "../../styles/username.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";

// -------------------------store data and custom hooks------------
import { useAuthStore } from "../../store/store";
import { useUserStore } from "../../store/store";
import { usePostStore } from "../../store/store";
import useFecth from "../../hooks/fecth.hooks";
import usePostFecth from "../../hooks/fecthpost.hooks";

// ------------------------------helpers------------------
import { passwordValidate } from "../../helper/validate";
import { loginUser } from "../../helper/helper";

const Password = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setPosts = usePostStore((state) => state.setPosts);

  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const [{ isLoading, apiData, serverError }] = useFecth(`user/${username}`);
  const [{ postData, postisLoading }] = usePostFecth();
  if (!postisLoading) {
    setPosts(postData);
  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      const loginPromise = loginUser({ username, password: value.password });

      loginPromise.then(async (res) => {
        let { token } = res;
        localStorage.setItem("token", token);
        setUser(apiData);

        if (!postisLoading) {
          navigate('/explore')
        }else{
          toast.loading("Fetching Posts")
        }
      });
      toast.promise(loginPromise, {
        loading: "loading",
        success: "loggedd in ",
        error: "Password not match",
      });
    },
  });

  if (isLoading)
    return <h1 className="flex justify-center p-10">Loading...</h1>;
  if (serverError) return <h1>{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={Styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl  font-bold capitalize  ">
              {" "}
              {apiData?.username}
            </h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              Glad You are Back!!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className={Styles.profile_img}
                src={apiData?.profile || Avatar}
                alt="Avatar"
              />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className={Styles.textbox}
                autoComplete="OFF"
                placeholder="Password"
              />
              <button className={Styles.btn} type="submit">
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
        ©{year} Lukn Developments || All right reserved
      </footer>
    </div>
  );
};

export default Password;
