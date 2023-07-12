/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"






const UsersProfile=(props)=>{
    const navigate=useNavigate();
    const {img,name}=props
    return <div onClick={() => navigate("/user", { state: { id: name } })} className=" w-[10%]  h-[90%] my-4  flex justify-center flex-col  px-3 items-center hover:cursor-pointer">
    
    <img src={img}  className="h-[50px] w-[50px] hover:border-red-700 mt-2 bg-gray-400 rounded-full border-2 border-black"  alt="" />
    <t className="capitalize text-xs mt-1" > {name}</t>


   
    

    </div>
}

export default UsersProfile