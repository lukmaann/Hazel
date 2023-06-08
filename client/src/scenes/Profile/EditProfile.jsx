import { Link } from "react-router-dom";
import Avatar from "../../assets/profile.png";
import Styles from "../../styles/username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helper/validate";
import { useState } from "react";
import convertToBase64 from "../../helper/convert";

import useFecth from "../../hooks/fecth.hooks";
import { updateUser } from "../../helper/helper";
import { useNavigate } from "react-router-dom";


const d = new Date();
let year = d.getFullYear();

const EditProfile = () => {
  const navigate = useNavigate();
  

  const [{ isLoading, apiData, serverError }] = useFecth();
  


  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: apiData?.email || "",
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      value = await Object.assign(value, { profile: file ||apiData?.profile|| "" });

      const updatePromise = updateUser(value);
      toast.promise(updatePromise, {
        loading: "updating user....",
        success: "update succefull",
        error: "cannot update",
      });

      // console.log(value);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    console.log(base64);
    setFile(base64);
  };


  if (isLoading)
    return (
      <h1 className="flex justify-center items-center p-10">Loading...</h1>
    );
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
            <h4 className="text-4xl font-bold text-pink-400">Edit Profile</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              nice!!!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={Styles.profile_img}
                  src={apiData?.profile || file || Avatar}
                  alt="Avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id="profile" />
            </div>
            <div className="textbox flex flex-col justify-center items-center gap-3">
              <div className="flex name gap-10 w-3/4">
                <input
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  className={Styles.textbox}
                  autoComplete="OFF"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  className={Styles.textbox}
                  autoComplete="OFF"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex name gap-10 w-3/4">
                <input
                  type="text"
                  {...formik.getFieldProps("mobile")}
                  className={Styles.textbox}
                  autoComplete="OFF"
                  placeholder="Mobile No"
                />
                <input
                  type="text"
                  {...formik.getFieldProps("email")}
                  className={Styles.textbox}
                  autoComplete="OFF"
                  placeholder="Email"
                />
              </div>

              <input
                type="text"
                {...formik.getFieldProps("address")}
                className={Styles.textbox}
                autoComplete="OFF"
                placeholder="Adress"
              />

              <button className={Styles.btn} type="submit">
                Save
              </button>
            </div>
            <div className="text-center py-10">
              <span>
                <Link
                  onClick={()=>navigate('/homepage')}
                  className=" px-2 text-red-500 font-medium"
                >
                 Home
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

export default EditProfile;
