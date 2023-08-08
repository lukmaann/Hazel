import { useFormik } from "formik";
import StartIcon from "@mui/icons-material/Start";
import { adminLogin } from "../helper/helper";

import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (value) => {
      const { password } = value;
      const loginpromise = adminLogin(password);

      toast.promise(loginpromise, {
        loading: "checking",
        success: "welcome",
        error: "wrong admin key",
      });

      loginpromise
        .then((data) => {
          // console.log(data);
          localStorage.setItem("AdminToken", data.token);
          navigate('/adminpage')
        })
        .catch((data) => {
          if (data === 400) {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        });
    },
  });
  return (
    <div>
  
      <div className="flex justify-center items-center h-screen ">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <h1 className="text-3xl font-semibold  mb-2">Welcome Admin</h1>
          </div>

          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Enter Admin Key"
            className="border-2 border-black p-2 shadow-lg   "
            autoComplete="OFF"
          />
          <button
            type="submit"
            className="p-2 border-2 shadow-lg border-black border-l-0 bg-yellow-400  "
          >
            <StartIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
