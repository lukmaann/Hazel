import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../../store/store"
import { toast ,Toaster } from "react-hot-toast"
import { addFriends } from "../../../helper/helper"
import Avatar from "../../../assets/profile.png"




/* eslint-disable react/prop-types */
const SuggestedUsers=(props)=>{
    
    const navigate=useNavigate()
    const loggedUser=useUserStore((state)=>state.user)
    const updateLogfriends=useUserStore((state)=>state.updateFriends)

    
    const {name,connections,profile,id,caption}=props
   
    const filteredconnection=connections.filter((item)=>{
        return loggedUser.friends.includes(item)
    })
    const makeConnection = () => {
        const friendpromise = addFriends({
          id: loggedUser._id,
          friendId: id,
        });
        toast.promise(friendpromise, {
          loading: "wait",
          success: "done",
          error: "error",
        });
        friendpromise.then((data) => {
         
            
          
    
          updateLogfriends(data);
        });
      };
  

    return <div  className="h-[90%]  min-w-[15vw] max-sm:min-w-[50vw] mx-1 relative bg-white border rounded-sm flex flex-col items-center">
    <Toaster/>
    <img src={profile||Avatar} onClick={()=>{navigate('/user',{state:{id:name}})}} className="w-[60%] h-[50%] rounded-full object-cover m-2  border-4 border-gray-100"/>
    <h1 onClick={()=>{navigate('/user',{state:{id:name}})}} className="font-semibold hover:cursor-pointer" >{name}</h1>
    {/* {caption } */}
    {caption=="Newly Joined"?<h3 className="text-red-500 animate-pulse text-sm">New  </h3>: (filteredconnection.length>0?<h3 className="text-gray-400 text-sm">{filteredconnection.length} mutuals</h3>:<h5 className="text-sm text-gray-400"> suggested for you</h5>)}
    <button onClick={makeConnection} className="bg-yellow-400 p-1 w-[80%] rounded-md absolute bottom-1 my-2">Connect</button>
    

    </div>
}

export default SuggestedUsers