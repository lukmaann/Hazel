// import { useState } from "react";
import { UseViewReportStore } from "../store/store";
import { deleteReport, deletepost } from "../helper/helper";
// import { toast } from "react-hot-toast";
import { UseReportStore } from "../store/store";

const ViewPost=()=>{
  const {setReports}=UseReportStore((state)=>state)
    const Report=UseViewReportStore((state)=>state.Report)
    const {username,postimg,caption,content,postId}=Report

    const delpost=()=>{
      deleteReport(postId).then((data)=>{
        setReports(data)
      })
      deletepost(postId);
   
    }

    if(username===""){
      return 
    }
  
    return <div className="w-[50%] p-2  text-white h-[100%]" > 
    <h1 className="text-3xl">POST</h1>
    <div className="w-[30%] h-[40%] flex justify-center items-center">
    {postimg!==""? <img src={postimg} alt="" className="object-cover h-[100%] w-[100%]" />:<h1 className="text-xl text-center">{caption}</h1>}

    </div>
    <h1>Reported by : {username}</h1>
    {postimg!==""&&<h1>post caption : {caption}</h1>}
    <h1>Report : {content}</h1>
    <button onClick={delpost} className="p-2 w-[30%] border rounded-sm my-5 hover:bg-red-500  font-bold">DELETE POST</button>
  
        
    </div>
}

export default ViewPost;