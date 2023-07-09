/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"






const SideUsers=(props)=>{
    const navigate=useNavigate();
    const {img,name}=props
    return <div className=" w-[100%] h-[20%] my-4 flex gap-4 px-3 items-center">
    
    <img src={img} className="w-[20%] h-[80%] rounded-full" alt="" />
    <h1 className="capitalize font-bold" onClick={() => navigate("/user", { state: { id: name } })}> {name}</h1>


   
    

    </div>
}

export default SideUsers