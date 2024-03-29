/* eslint-disable no-unused-vars */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "../../assets/profile.png";
import { useState } from "react";
import { useUserStore } from "../../store/store";
import Posts from "./posts/posts";
import { usePostStore } from "../../store/store";
import useFecth from "../../hooks/fecthpost.hooks";
import VerifiedIcon from '@mui/icons-material/Verified';

const impressions = Math.floor(Math.random() * 10);
const verifiedUsers=["lukmaan","Lukmaan"]


const HomeProfile = () => {
  const feedPosts=usePostStore(state=>state.feedPosts)
  // const setPosts=usePostStore(state=>)
  
  const user = useUserStore((state) => state.user);
  const [click, setclick] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [{postData}]=useFecth()
  // const feedPosts=postData

  return (
    <div className="ml-64 flex flex-col items-center p-3 w-10/12 max-sm:ml-0 max-sm:w-[100vw]">
    
      <div className="w-11/12 h-1/3 flex items-center flex-wrap mb-5 max-sm:w-[100%] max-sm:h-min">
       
       <div className=" rounded-full h-32 w-32 max-sm:h-[20vw] max-sm:w-[20vw] ">
          <img
            className="rounded-full h-32 object-cover w-32 hover:cursor-pointer max-sm:h-[100%] max-sm:w-[100%] hover:border-blue-400 border-4"
            src={user.profile || Avatar}
          />
        </div>
       
        <div className="w-8/12 ml-8 p-8 h-[90%]">
          <div className="flex gap-4">
            <h1 className="text-2xl font-normal">{user.username} {verifiedUsers.includes(user.username) && <VerifiedIcon/>}</h1>
            <button onClick={() => setclick(!click)}>
              <ExpandMoreIcon />
            </button>
          </div>
          {click && (
            <button className="ml-24 ">
              <button
                onClick={() => setShowNumber(!showNumber)}
                className="border-black border mt-3 mx-3  rounded-lg border-b-4 border-purple-600  px-2 hover:text-gray-500p "
              >
                {showNumber ? user.mobile : "contact"}
              </button>
            </button>
          )}

          <div className="flex gap-4 w-[55vw]">
            <h1 className="text-xl mt-3 font-normal max-sm:text-sm max-sm:font-bold">
              {user.friends.length} Connections 
            </h1>
            <h1 className="text-xl mt-3 font-normal max-sm:text-sm">{impressions} Views</h1>
          </div>

          {user.firstName ? (
            <h1 className="text-l mt-3 font-bold">
              {user.firstName} {user.lastName}
            </h1>
          ) : (
            <h1 className="text-l mt-3 font-bold cursor-pointer ">
              Add details
            </h1>
          )}
        </div>
      </div>
      
      <div className="w-[100%] mr-0  flex flex-wrap  text-white h-min p-5 max-sm:p-0">
      <h1 className=" border px-10 rounded-md p-2 mb-5 bg-black">posts</h1>
      <div className="flex justify-items-start gap-6 flex-wrap w-[95%] max-sm:w-[100%] max-sm:gap-0 h-[100%] max-sm:mt-0">
      {feedPosts===null?<>loading</>:feedPosts.map((item,index)=>{
        if(user._id===item.userId){
        return <Posts key={index} caption={item.caption} picturePath={item.picturePath} postUserId={item.userId} likes={item.likes} id={item._id}/>


        }
        
      })}
      </div>
     
      </div>
    </div>
  );
};
export default HomeProfile;
