/* eslint-disable react/prop-types */
import { getSingleUser } from "../helper/helper"


const ReportUnit=(props)=>{
    const {userId}=props;
    getSingleUser(userId)
    
   



    return <div className="w-[100%] h-[30%] select-text rounded-xl p-2 my-2 flex items-center justify-center">
    {userId}
    
        
    </div>
}

export default ReportUnit