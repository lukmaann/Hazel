import { getSingleUser } from "../helper/helper"



const ReportUnit=(properties)=>{
    const {userId}=properties
    getSingleUser({id:userId})
    return <div className="w-[100%] h-[30%] select-text rounded-xl p-2 my-2 flex items-center justify-center">
    {userId}
    
        
    </div>
}

export default ReportUnit