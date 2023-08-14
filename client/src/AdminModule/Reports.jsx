/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { deleteReport, getSinglePost, getSingleUser } from "../helper/helper";
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { UseViewReportStore } from "../store/store";


import { UseReportStore } from "../store/store";
import { toast } from "react-hot-toast";


const ReportUnit = (props) => {
  const {setReports}=UseReportStore((state)=>state)
  const {setViewReport,Report}=UseViewReportStore((state)=>state)

  const [user, setUser] = useState("");
  const [post, setPost] = useState(null);
 
  const { userId, content,postId ,id} = props;

  useEffect(()=>{
    getSingleUser(userId).then((data) => setUser(data))
    getSinglePost(postId).then((data)=>setPost(data))

  },[])

  const viewReport=()=>{

    setViewReport({username:user.username,caption:post.caption,postId:post._id,postimg:post.picturePath,content})
    
  }
  

  

  const delreport=()=>{
    const delpromise=post!==null?deleteReport(postId):deleteReport(id);
    toast.promise(delpromise,{
      loading:"deleting report",
      success:"report deleted",
      error:"error occured"
    })

    delpromise.then((data)=>{
      setReports(data)
    })
    
  }
  if(post===null){
    return <div className="bg-gray-800 rounded-lg p-3 flex justify-between text-gray-200 h-[15%] my-2">
    <div className="w-[80%]">
    <h1 className="text-xl ">This post is deleted</h1>
    
    </div>
    <button onClick={delreport} className="hover:text-red-500"><DeleteIcon/></button>
    
    </div>
  }

  return (
   <div className="bg-gray-800 rounded-lg p-3 flex justify-between text-gray-200 h-[15%] my-2">
   <div className="w-[80%]">
   <h1 className="text-xl ">{content.slice(0,35)}...</h1>
   <h2 className="text-xs text-gray-400 my-2">{user.username}</h2>
   
   </div>
   <button onClick={viewReport} className="hover:text-yellow-400"><OpenInFullIcon/></button>

   <button onClick={delreport} className="hover:text-red-500"><DeleteIcon/></button>
   </div>
  );
};

export default ReportUnit;
