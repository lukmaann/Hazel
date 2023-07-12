/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

const FriendsUnit=(props)=>{
    const navigate=useNavigate();
    const {img,name}=props
    return <div onClick={() => navigate("/user", { state: { id: name } })} className=" h-[15%] flex items-center hover:cursor-pointer px-3 m-2 my-4">
    <img src={img} className="h-[40px] w-[40px] shadow-lg rounded-full mr-3"/>
    <t >{name}</t>


        
    </div>
}


export default FriendsUnit