/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"






const UsersProfile=(props)=>{
    const navigate=useNavigate();
    const {img,name}=props
    return <div onClick={() => navigate("/user", { state: { id: name } })} className=" w-[10%]  h-[90%] my-4  flex justify-center flex-col  px-3 items-center hover:cursor-pointer">
    
   <div className="h-[50px] w-[50px] rounded-full " >
   <img src={img}  className=" hover:border-purple-500  shadow-lg rounded-full h-[50px] border-2 border-black w-[50px]  p-1  "  alt="" />
   </div>
    <t className="capitalize text-xs mt-1" > {name}</t>


   
    

    </div>
}

export default UsersProfile