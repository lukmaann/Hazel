import Avatar from "../assets/upload.png"
import { useFormik } from "formik";
import convertToBase64 from "../helper/convert";
import { useState } from "react";

import { uploadPosts } from "../helper/helper";
import { toast,Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useModal } from "../store/store";
import { useUserStore } from "../store/store";
import { usePostStore } from "../store/store";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CreatePost = () => {
  const navigate=useNavigate();
  const setPosts=usePostStore(state=>state.setPosts)
  const user=useUserStore((state)=>state.user)
  const setModal=useModal((state)=>state.setModal)
  const [isDisabled,setDisable]=useState(false)
  const [uploadclick,setuploadclick]=useState(false)

  

  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      caption: "",
      location: "",
    },
    enableReinitialize:true,
    validateOnBlur: false,
    validateOnChange: false,

    
    onSubmit: async (value) => {
      value = await uploadclick ? Object.assign(value, {  picturePath: file  }):Object.assign(value, {  picturePath: ""  });
      value = await Object.assign(value, { userId: user._id || "" });
      const createPromise= uploadPosts(value);
      toast.promise(createPromise,{
        success:"Posted",
        loading:"Posting...",
        error:"Cant upload post"
      },{
        position:"bottom-right"
      })
      setDisable(true)

      createPromise.then((data)=>{
        setModal(false)
        setPosts(data)
        
        navigate('/homepage')
        
        
        
      

      
      })
  
   
      
    
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  
    return (
      <div className="h-max w-[45vh]  flex flex-col items-center max-sm:w-[100%] max-sm:h-[80%]">
       <Toaster toastOptions={{style:{background:"#D2D2C0"}}} position="bottom-right" reverseOrder={false}></Toaster>
       <button className="bg-gray-400 px-2 text-white rounded-lg m-2" onClick={()=>setuploadclick(!uploadclick)}>{uploadclick?"DisSelect Image":"Select Image"} <AddPhotoAlternateIcon/></button>
       
        <form
          action=""
          className="flex flex-col items-center "
          onSubmit={formik.handleSubmit}
        >
         {
          uploadclick&&
          <div className="profile w-[70%] h-[270px] select-none hover:cursor-pointer  text-center py-4">
            <label htmlFor="profile">
              <img
                className="rounded-sm "
                src={file || Avatar}
                alt="Avatar"
              />
            </label>
            <input type="file" onChange={onUpload} id="profile" />
          </div>
         }
        
          <div className="w-[90%] text-center ">
            <textarea
              type="text"
              {...formik.getFieldProps("caption")}
              className=" p-1 w-[100%] text-center h-24  mt-10  focus: outline-none "
              placeholder="What's new today?"
            />
            <input
              type="text"
              placeholder="Add Loacation"
              autoComplete="OFF"
              className="p-1 w-[90%] text-center m-2 focus:outline-none"
              {...formik.getFieldProps("location")}
            />

            <button
              className="w-[90%] bg-[#38B6FF]  text-white hover:bg-black  rounded-xl my-3 font-bold  text-yellow-50p h-8 disabled:cursor-not-allowed"
              
              disabled={isDisabled}
              type="submit"
              
            >
              Post
            </button>
          </div>
        </form>
      
      </div>
    );
};

export default CreatePost;
