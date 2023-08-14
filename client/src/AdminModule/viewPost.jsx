/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { toast } from "react-hot-toast";
import { deleteReport, deletepost } from "../helper/helper";
import { UseReportStore } from "../store/store";


const ViewPost=(props)=>{
    const setReports=UseReportStore((state)=>state.setReports)

    const {img,id,caption,likes,username,reportId}=props

    const delpost=()=>{
        const deletepromise=deletepost(id)

        toast.promise(deletepromise,{
            loading:"deleting post",
            success:"post deleted",
            error:"error"
        })
        deleteReport(reportId).then((data)=>setReports(data))
     

    }
    let likeCount = Object.keys(likes).length;
    return <div className="w-[40vw] border-2 border-black h-[100vh]">
    <div className="w-[100%] mb-2 flex justify-around h-[80%] bg-black text-white"  >
    <div className="w-[50%] h-[100%] flex justify-center items-center">
    {img?<img className="w-[100%] h-[100%] object-scale-down" src={img}/>:<h1>{caption}</h1>}
    </div>
    <div className="w-[50%] p-5 h-[100%] flex flex-col justify-center items-start text-black bg-white">
    
    <h1>Username : {username}</h1>
    
    <h1> Total Likes on post : {likeCount}</h1>
    <h1>Caption : {caption}</h1>
    

    
    

    </div>


    </div>
<div className="h-[15%] w-[100%] flex items-center justify-around - text-black">
<button className="p-2 border-2 rounded-lg m-2 hover:bg-red-500 hover:border-white border-black" onClick={delpost}>Delete this post</button>
    {/* <button className="p-2 border-2 rounded-lg m-2 hover:bg-red-500 hover:border-white border-black">Terminate User</button> */}
</div>


    </div>
}

export default ViewPost;