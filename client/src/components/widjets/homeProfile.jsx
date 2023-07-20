import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "../../assets/profile.png";
import { useState } from "react";
import { useUserStore } from "../../store/store";
import Posts from "./posts/posts";
import { usePostStore } from "../../store/store";
const impressions = Math.floor(Math.random() * 10);


const HomeProfile = () => {
  const feedPosts=usePostStore(state=>state.feedPosts)
  
  const user = useUserStore((state) => state.user);
  const [click, setclick] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className="ml-64 flex flex-col items-center p-3 w-10/12 max-sm:ml-0 max-sm:w-[100vw]">
      <div className="w-11/12 h-1/3 flex items-center flex-wrap  border-b max-sm:w-[100%] max-sm:h-[20%]">
       
       <div className=" rounded-full h-32 w-32 max-sm:h-[80px] max-sm:w-[80px]">
          <img
            className="rounded-full h-32 w-32 hover:cursor-pointer max-sm:h-[100%] max-sm:w-[100%] hover:border-blue-400 border-4"
            src={user.profile || Avatar}
          />
        </div>
       
        <div className="w-8/12 ml-8 p-8 h-[90%]">
          <div className="flex gap-4">
            <h1 className="text-2xl font-normal">{user.username} </h1>
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

          <div className="flex gap-4">
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
      
      <div className="w-[100%] mr-0 flex flex-wrap justify-center text-white h-min p-5 max-sm:p-0">
      <div className="flex justify-start gap-6 flex-wrap w-[95%] max-sm:w-[100%] max-sm:gap-1 max-sm:mt-10">
      {feedPosts.map((item,index)=>{
        if(user._id===item.userId){
        return <Posts key={index} picturePath={item.picturePath} postUserId={item.userId} likes={item.likes} id={item._id}/>


        }
        
      })}
      </div>
     
      </div>
    </div>
  );
};
export default HomeProfile;
