import Avatar from "../../assets/profile.png";
import year from "../../helper/date"
import Styles from "../../styles/username.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import {editProfileValidation } from "../../helper/validate";
import { useState } from "react";
import convertToBase64 from "../../helper/convert";
import MenuItems from "../../components/widjets/menuItems";
import PopUp from "../../components/widjets/PopUp";
import { useModal } from "../../store/store";
import CreatePost from "../../components/CreatePost";
import { useUserStore } from "../../store/store";

import { updateUser } from "../../helper/helper";



const EditProfile = () => {
  const {modal,setModal}=useModal(state=>state)
  const user=useUserStore((state)=>state.user)
  const updateUserData=useUserStore((state)=>state.updateUserData)
 

  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      mobile: user.mobile || "",
      address: user.address || "",
    },
    enableReinitialize: true,
    validate: editProfileValidation,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      value = await Object.assign(value, {
        profile: file || user.profile || "",
      });
   

      const updatePromise = updateUser(value);
      toast.promise(updatePromise, {
        loading: "updating user....",
        success: "update succefull",
        error: "cannot update",
      });

      updatePromise.then(()=>{
        updateUserData(value)
        console.log("updated");
     

      })
  
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    console.log(base64);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <MenuItems />
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={`${Styles.glass} h-[550px] `} >
          <div className="title flex flex-col items-center">
            <h4 className="text-4xl font-bold text-purple-500">Edit Profile</h4>
            <span className="text-gray-500  text-l text-center py-3 w-2/3">
              nice!!!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={Styles.profile_img}
                  src={user.profile || file || Avatar}
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
            <div className="text-center py-10"></div>
          </form>
        </div>
        <PopUp openPopup={modal} setOpenPopup={setModal} title="Create Post">
        <CreatePost />
      </PopUp>
      </div>
      <footer className="text-center text-sm text-gray-600 py-2">
        ©{year} Lukn Developments || All right reserved
      </footer>
    </div>
  );
};

export default EditProfile;
