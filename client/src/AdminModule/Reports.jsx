/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { deleteReport, getSinglePost, getSingleUser } from "../helper/helper";
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import PopUp from "../components/widjets/PopUp";
import ViewPost from "./viewPost";
import { UseReportStore } from "../store/store";
import { toast } from "react-hot-toast";


const ReportUnit = (props) => {
  const {setReports}=UseReportStore((state)=>state)
    const[open,setopen]=useState(false)
  const [user, setUser] = useState("");
  const [post,setPost]=useState({picturePath:""})
  const { userId, content,id,postId } = props;

  useEffect(()=>{
    getSingleUser(userId).then((data) => setUser(data))
    getSinglePost(postId).then((data)=>setPost(data))

  },[])

  
  

  

  const delreport=()=>{
    const delpromise=deleteReport(id);
    toast.promise(delpromise,{
      loading:"deleting report",
      success:"report deleted",
      error:"error occured"
    })

    delpromise.then((data)=>{
      setReports(data.reports)
    })
    
  }

  return (
    <div className="w-[100%] h-[50%] border-2 border-b select-text rounded-xl p-2 my-2 flex items-center justify-around">
    <div className="w-[25%] h=[50%] border-r border-black flex items-center justify-center">
    <img src={user.profile} className="w-[50%] border-2 border-black p-1 rounded-full" />

    </div>
      <div className="px-5 w-[25%] m-2 h-[50%] border-r border-black justify-center items-center flex overflow-hidden noscrollbar">
        <h1 className="font-bold">{user.username}</h1>
        
      </div>
      <div className="px-5 w-[25%] h-[50%] m-2 border-r justify-center items-center flex border-black overflow-auto noscrollbar">
        <h1 className="">{content}</h1>
        
      </div>
      <div className="px-5 w-[25%] h-[50%] m-2 gap-2 flex items-center justify-center border-r border-black">
        <button onClick={()=>setopen(true)}>view post</button>
        <LaunchIcon/>
      </div>
      <div onClick={delreport} className="px-5 w-[25%] h-[50%] flex  gap-2 items-center justify-center ">
        <button>Delete report</button>
        <DeleteIcon/>
      </div>
      <PopUp     openPopup={open}
        setOpenPopup={setopen}
        title="Reported post">
            <ViewPost username={user.username}  img={post.picturePath} id={post._id} likes={post.likes} caption={post.caption}/>
        </PopUp>
      
      
    </div>
  );
};

export default ReportUnit;
