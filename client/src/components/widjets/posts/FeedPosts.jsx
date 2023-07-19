/* eslint-disable react/prop-types */

import { useState } from "react";
import Heart from "react-heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../comment/CommentBox";
import { usePostStore, useUserStore } from "../../../store/store";
import { UpdateLikes } from "../../../helper/helper";

import { useNavigate } from "react-router-dom";

const FeedPosts = (props) => {
  const { likes, caption, comments, postId, profile, firstName, picturePath } =
    props;
  const [clickComment, setClickComment] = useState(true);
  const likePost = usePostStore((state) => state.likePost);
  const [onpost, setonpost] = useState(false);
  const navigate = useNavigate();

  const loggedUser = useUserStore((state) => state.user);
  let likeCount = Object.keys(likes).length;
  const isLiked = Boolean(likes[loggedUser._id]);
  const userId = loggedUser._id;
  const [liked, setliked] = useState(isLiked);
  const [likecounts, setlikecounts] = useState(likeCount);

  const LikePost = () => {
    const data = UpdateLikes({ postId, userId });
    liked ? setlikecounts(likecounts - 1) : setlikecounts(likecounts + 1);
    setliked(!liked);

    data.then((post) => {
      likePost(post);
    });
  };

  return (
    <div className="p-10 flex flex-wrap   bg-white ">
      <div
        className={
          onpost
            ? "w-[80vw]"
            : "w-[60vh] h-[100vh] mx-8 border-2 border-black drop-shadow-sm bg-white rounded"
        }
      >
        <div className="w-[100%] h-[10%]  border-black flex  items-center p-4 ">
          <img
            src={profile}
            className=" h-10 border-2 w-10  mr-4 border-gray-300 rounded-full "
            alt="profile img"
          />
          <button
            onClick={() => navigate("/user", { state: { id: firstName } })}
            className="font-bold font-sans hover:text-gray-500 cursor-pointer"
          >
            {firstName}{" "}
          </button>
        </div>
        <div className="h-[80%] w-[100%]   bg-white flex text-white justify-center items-center">
          <img
            src={picturePath}
            onClick={() => {
              setonpost(!onpost);
            }}
            className={
              onpost
                ? "w-[70%]"
                : "h-[90%] object-cover  select-none  border-black w-[90%]"
            }
            alt=""
          />
        </div>
        <div className=" h-[10%]">
          <div className="flex  items-center h-[100%] justify-around px-5  min-w-fit">
            <Heart
              isActive={liked}
              onClick={LikePost}
              className="w-6 mt-2 ml-4  "
            />
            <h2 className="  mt-1 text-sm w-fit  select-none">
              <span className="font-semibold ">{likecounts} Likes</span>
            </h2>

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
        </div>
      </div>
      <div className={onpost ? "hidden" : "w-[40%] "}>
        <div className="mt-12 flex justify-center h-[20%]   overflow-hidden">
          <h1 className="text-base   bg-white w-[90%] h-28 overflow-y-auto border-black px-3 rounded-lg">
            {" "}
            <span className="text-gray-700 ">Caption :</span> {caption}
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
