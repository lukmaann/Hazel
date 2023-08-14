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
    const delpromise=deleteReport(postId);
    toast.promise(delpromise,{
      loading:"deleting report",
      success:"report deleted",
      error:"error occured"
    })

    delpromise.then((data)=>{
      setReports(data)
    })
    
  }

  return (
   <div className="bg-gray-800 rounded-lg p-3 flex justify-between text-gray-200 h-[10%] my-2">
   <div className="w-[80%]">
   <h1 className="text-xl ">{content.slice(0,35)}...</h1>
   <h2 className="text-xs text-gray-400 my-2">{user.username}</h2>
   
   </div>
   <button onClick={delreport}><DeleteIcon/></button>
   </div>
  );
};

export default ReportUnit;
