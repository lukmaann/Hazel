/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import Avatar from "../../../assets/profile.png"


const FriendsUnit=(props)=>{
    const navigate=useNavigate();
    const {img,name}=props
    return <div onClick={() => navigate("/user", { state: { id: name } })} className=" h-[15%] flex items-center bg-gradient-to-r from-gray-100 to-white hover:cursor-pointer px-3 m-2 my-4">
    <img src={img||Avatar} className="h-[30px] w-[30px] shadow-lg rounded-full mr-3"/>
    <h1 className="text-sm font-sans">{name}</h1>


        
    </div>
}


export default FriendsUnit