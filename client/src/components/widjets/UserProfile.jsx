/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import Avatar from "../../assets/profile.png";
import {  useState } from "react";

import Posts from "./posts/posts";
import { addFriends } from "../../helper/helper";
import { usePostStore, useUserStore } from "../../store/store";
import { toast, Toaster } from "react-hot-toast";
const impressions = Math.floor(Math.random() * 10);

const UserProfile = (props) => {
  const { user } = props;

  const feedPosts = usePostStore((state) => state.feedPosts);
  const loggedUser = useUserStore((state) => state.user);
  const updateLogfriends=useUserStore((state)=>state.updateFriends);

  const [click, setclick] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [friends,setFriends]=useState(user.friends)


    const isfriend=loggedUser.friends.includes(user._id);
    

  

  



  const makeConnection = () => {
    const friendpromise = addFriends({
      id: loggedUser._id,
      friendId: user._id,
    });
    toast.promise(friendpromise, {
      loading: "wait",
      success: "done",
      error: "error",
    });
    friendpromise.then((data)=>{
      if(isfriend){
        setFriends((prev)=>{
          return prev.filter((f)=>{
            return f!==loggedUser._id
          })
        })
      }else{
        setFriends((prev)=>{
          return [...prev,loggedUser._id]
        })
      }
    
      
   
    
      updateLogfriends(data);

      
      
    })
  };

  return (
    <div className="ml-64 flex flex-col items-center p-3 w-[80%]">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>

      <div className="w-11/12 h-1/3 flex items-center border-b">
        <div className=" rounded-full h-32 w-32">
          <img
            className="rounded-full h-32 w-32 hover:cursor-pointer  hover:border-blue-400 border-4"
            src={user.profile || Avatar}
          />
        </div>
        <div className="w-8/12 ml-8 p-8 h-[90%]">
          <div className="flex gap-4">
            <h1 className="text-2xl font-normal">{user.username} </h1>
            <button onClick={() => setclick(!click)}>
              <ExpandMoreIcon />
            </button>
            <button
              onClick={makeConnection}
              className="bg-gray-500 px-2 text-white rounded-lg  border border-b-4 border-black  hover:bg-black "
            >
              {isfriend ?  <PersonAddDisabledIcon/>:<PersonAddAlt1Icon/> }
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
            <h1 className="text-xl mt-3 font-normal">
              {friends.length} Connections{" "}
            </h1>
            <h1 className="text-xl mt-3 font-normal">{impressions} Views</h1>
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

      <div className="w-11/12 flex flex-wrap justify-center  text-white h-min p-5">
        <div className="flex justify-start flex-wrap  w-[95%]">
          {feedPosts.map((item, index) => {
            if (user._id === item.userId) {
              return (
                <Posts
                  key={index}
                  picturePath={item.picturePath}
                  likes={item.likes}
                  id={item._id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
