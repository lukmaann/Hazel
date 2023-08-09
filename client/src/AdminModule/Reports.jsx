/* eslint-disable react/prop-types */
import { useState } from "react";
import { deleteReport, getSingleUser } from "../helper/helper";
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
  const { userId, content,id } = props;
  getSingleUser(userId).then((data) => {
    setUser(data);
  });

  const delreport=()=>{
    const delpromise=deleteReport(id);
    toast.promise(delpromise,{
      loading:"deleting report",
      success:"report deleted",
      error:"error occured"
    })

    delpromise.then((data)=>setReports(data))
    
  }

  return (
    <div className="w-[100%] h-[30%] border-2 border-b select-text rounded-xl p-2 my-2 flex items-center justify-around">
      <img src={user.profile} className="w-[10%] h-[80%] border-2 border-black p-1 rounded-full" />
      <div className="px-5 w-max m-2 border-r border-black overflow-hidden noscrollbar">
      <h1 className="underline">Reported By</h1>
        <h1 className="font-bold">{user.username}</h1>
        
      </div>
      <div className="px-5 w-[30%] h-[50%] m-2 border-r border-black overflow-auto noscrollbar">
      <h1 className="underline">Report content</h1>
        <h1 className="">{content}</h1>
        
      </div>
      <div className="px-5 w-max h-[50%] m-2 gap-2 flex items-center justify-center border-r border-black">
        <button onClick={()=>setopen(true)}>view post</button>
        <LaunchIcon/>
      </div>
      <div onClick={delreport} className="px-5 w-max h-[50%] flex  gap-2 items-center justify-center ">
        <button>Delete report</button>
        <DeleteIcon/>
      </div>
      <PopUp     openPopup={open}
        setOpenPopup={setopen}
        title="Reported post">
            <ViewPost/>
        </PopUp>
      
      
    </div>
  );
};

export default ReportUnit;
