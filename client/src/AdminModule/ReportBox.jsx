import { useEffect } from "react"
import { getAllReports } from "../helper/helper";
import {toast} from "react-hot-toast"
import { UseReportStore } from "../store/store";
import ReportUnit from "./Reports";

const ReportBox=()=>{
    const {Reports,setReports}=UseReportStore((state)=>state)
    useEffect(()=>{
        const getpromise=getAllReports();
        getpromise.then((data)=>setReports(data))
        toast.promise(getpromise,{
            loading:"fectching reports",
            success:'done',
            error:"cant get errors"
        })
        
    },[])
    return <div className="w-[100%] h-[100%] overflow-auto noscrollbar">
    {
        Reports.map((item,index)=>{
            return <ReportUnit key={index} postId={item.postId} id={item._id} userId={item.reportedById} content={item.reportContent}/>
        })
    }
    
        

    </div>
}


export default ReportBox