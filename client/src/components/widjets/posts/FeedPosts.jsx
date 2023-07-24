/* eslint-disable react/prop-types */

import { useState } from "react";
import Heart from "react-heart";
import Avatar from "../../../assets/profile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../comment/CommentBox";
import {
  usePostStore,
  useUserStore,
  AllUsersStore,
} from "../../../store/store";
import { UpdateLikes } from "../../../helper/helper";

import { useNavigate } from "react-router-dom";

const FeedPosts = (props) => {
  const {
    likes,
    caption,
    comments,
    postId,
    picturePath,
    location,
    postUserId,
  } = props;
  const [clickComment, setClickComment] = useState(false);

  const likePost = usePostStore((state) => state.likePost);
  const { Users } = AllUsersStore((state) => state);
  const [moreCaption, setMoreCaption] = useState(false);
  const navigate = useNavigate();

  const loggedUser = useUserStore((state) => state.user);
  let likeCount = Object.keys(likes).length;
  const isLiked = Boolean(likes[loggedUser._id]);
  const userId = loggedUser._id;
  const [liked, setliked] = useState(isLiked);
  const [likecounts, setlikecounts] = useState(likeCount);

  let profile = "";
  let firstName = "";

  Users.map((item) => {
    if (item._id === postUserId) {
      profile = item.profile;
      firstName = item.username;
    }
  });

  const LikePost = () => {
    const data = UpdateLikes({ postId, userId });
    liked ? setlikecounts(likecounts - 1) : setlikecounts(likecounts + 1);
    setliked(!liked);

    data.then((post) => {
      likePost(post);
    });
  };

  const myconnection=Users.filter((item)=>{
    return loggedUser.friends.includes(item._id)
  })
  
  let friendliked=myconnection.filter((item)=>{
    return likes[item._id]
  })

  if(friendliked.length==0){
    friendliked=[{username:"lukmaan"}]
  }
 
  



  return (
    <div className="p-10 flex flex-wrap  h-min z-10 bg-white max-sm:w-[100vw] max-sm:p-0">
      <div className={"w-[35vw] h-[90%]  bg-white rounded max-sm:w-[100vw] "}>
        <div className="w-[100%] h-[10%]  flex  items-center p-4 ">
          <img
            src={profile||Avatar}
            className=" h-10 border-2 w-10  mr-4 border-gray-300 rounded-full "
            alt="profile img"
          />
          <div className="h-12 w-20">
            <button
              onClick={() => navigate("/user", { state: { id: firstName } })}
              className="font-bold font-sans lowercase hover:text-gray-500 cursor-pointer"
            >
              {firstName}
            </button>
            <h6 className="font-thin lowercase text-xs">{location}</h6>
          </div>
        </div>
        <div className="h-[90%] w-[100%]   bg-white flex text-white justify-center items-center">
          <img
            src={picturePath}
            className={
              "h-[100%] object-cover rounded-lg select-none   border-black w-[90%] "
            }
            alt=""
          />
        </div>
        <div className=" h-[20%]">
          <div className="h-[100%]">
            <div className="flex  items-center   px-5  min-w-fit">
              <Heart
                isActive={liked}
                onClick={LikePost}
                className="w-6 mt-2 ml-4  "
              />

              <FontAwesomeIcon
                icon={faComment}
                onClick={() => {
                  setClickComment(!clickComment);
                }}
                className={
                  clickComment
                    ? "mt-2 mx-3 text-2xl  text-gray-800 drop-shadow-sm"
                    : "mt-2 mx-3 text-2xl text-black"
                }
              />
            </div>

            <h2 className=" w-[100%]  mt-1 text-sm font-bold px-10 select-none">
              {likecounts} {likeCount>1?"Likes":"Like"}  {likeCount>1 && `, also liked by ${friendliked[0].username}`}
            </h2>
          
            <div className=" h-min overflow-y-auto  flex noscrollbar">
              <h1 className="px-10 font-thin text-sm">
                <span
                  onClick={() =>
                    navigate("/user", { state: { id: firstName } })
                  }
                  className="font-bold hover:cursor-pointer"
                >
                  {firstName}
                </span>{" "}
                {moreCaption ? caption : caption.slice(0, 90)}{" "}
                <span
                  onClick={() => {
                    setMoreCaption(!moreCaption);
                  }}
                  className="text-gray-500 "
                ><br></br>
                  {" "}
                  {moreCaption ? "Show less ↗" : "Show more..."}
                </span>
              </h1>
              
            </div>

          </div>
        </div>
      </div>
      <div className={"w-[40%] mt-20 h-[90%] max-sm:w-[100%] max-sm:mt-10"}>
        <div className=" flex justify-center h-[20%]   overflow-hidden"></div>
        {clickComment && (
          <div className="w-[100%] h-[100%]  flex justify-center">
            <CommentBox postId={postId} comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPosts;
