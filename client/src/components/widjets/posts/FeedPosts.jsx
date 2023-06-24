/* eslint-disable react/prop-types */

import { useState } from "react";
import Heart from "react-heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../comment/CommentBox";
import { usePostStore, useUserStore } from "../../../store/store";
import { UpdateLikes } from "../../../helper/helper";
import {  Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeedPosts = (props) => {
  const {likes,caption,comments,postId,profile,firstName,picturePath}=props
  const [clickComment, setClickComment] = useState(false);
  const likePost=usePostStore(state=>state.likePost);
  const navigate = useNavigate();



  const loggedUser=useUserStore(state=>state.user)
  let likeCount = Object.keys(likes).length;
  const isLiked=Boolean(likes[loggedUser._id]);
  const userId=loggedUser._id
  

  const LikePost=()=>{

    const data=UpdateLikes({postId,userId});
    toast.promise(data,{
      success:isLiked?"🥹":"😁",
      loading:isLiked?"Dislike?":"like?",
      error:"Action abort"
    },{
      position:"bottom-right",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      
    })
    data.then((post)=>{
      likePost(post)
    })
   
 
   
  }
 

  return (
    <div className="p-10 flex flex-wrap  ">
    <Toaster position="bottom-right"/>
          

      <div className="w-[40%] h-[100vh] m-8 border-b-4  border border-gray-600 drop-shadow-sm bg-white rounded-lg">
        <div className="w-[100%] h-16  flex  items-center p-4 ">
          <img
            src={profile}
            className="w-10 h-10 border-2  mr-4 border-gray-300 rounded-full "
            alt="profile img"
          />
          <button onClick={()=>navigate("/user",{state:{id:firstName}})} className="font-bold font-sans hover:text-gray-500 cursor-pointer">
            {firstName}{" "}
          </button>
          <h1 className="ml-[60%]">...</h1>
        </div>
        <div className="h-[78%] w-[100%] rounded-2xl flex text-white justify-center items-center">
          <img
            src={picturePath}
            className="h-[100%] select-none  border-gray-500 w-[100%]"
            alt=""
          />
        </div>
        <div className=" ">
          <div className="flex  items-center-center h-[110%] min-w-fit">
            <Heart
              isActive={isLiked}
              onClick={LikePost}
              className="w-6 mt-2 ml-4"
            />
            <FontAwesomeIcon
              icon={faComment}
              onClick={() => {
                setClickComment(!clickComment);
              }}
              className={
                clickComment
                  ? "mt-2 mx-3 text-2xl  text-yellow-400 drop-shadow-sm"
                  : "mt-2 mx-3 text-2xl text-black"
              }
            />
          </div>
          <h2 className=" px-5 mt-1 text-lg w-fit   select-none">
            {likeCount} <span className="font-bold">likes</span>
          </h2>
        </div>
      </div>
      <div className="w-[40%]">
        <div className="mt-12 flex justify-center h-[20%]  overflow-hidden">
          <h1 className="text-lg   bg-white w-[90%] h-28 overflow-y-auto border-black px-3 rounded-lg">
            {" "}
            <span className="text-gray-500 ">Caption :</span>{" "}
            {caption}
          </h1>
        </div>
        {clickComment && (
          <div className="w-[100%] h-[70%] flex justify-center">
            <CommentBox postId={postId} comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPosts;
