/* eslint-disable no-unused-vars */
import MenuItems from "../../components/widjets/menuItems";
import PopUp from "../../components/widjets/PopUp";
import { useModal, usePostStore } from "../../store/store";
import CreatePost from "../../components/CreatePost";

import FeedPosts from "../../components/widjets/posts/FeedPosts";

import UserBox from "../../components/widjets/SideUser/usersBox";
import Logo from "../../components/widjets/logo";
import SuggestionBox from "../../components/widjets/SideUser/suggestionBox";
import NewUsersBox from "../../components/widjets/SideUser/newUsersBox";
import useFecth from "../../hooks/fecthpost.hooks";
import { Skeleton } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useEffect, useState } from "react";
const ExplorePage = () => {
  const [{ postData, postisLoading }] = useFecth();

  const feedPosts = usePostStore((state) => state.feedPosts);
  // const setPosts=usePostStore((state)=>state.setPosts)
  
  // const feedPosts=postData
  // setPosts(postData)
  
  
 


  // console.log("dff");
  // const feedPosts = null;

  

 

  const { modal, setModal } = useModal((state) => state);
  if (postisLoading ||feedPosts == null) {
    return (
      <div>
      
        <Skeleton variant="rectangular" height={40} width={100} className="m-2  sm:hidden "/>
        <div className="flex ml-[20vw] mt-0 max-sm:ml-0  overflow-hidden ">
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          
        </div>
        <div className="ml-[20vw] m-10 max-sm:ml-0 ">
          <div className="flex gap-1 ml-[5vw] ">
            <Skeleton variant="circular" height={50} width={50} />
            <div>
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div>
            <Skeleton
              variant="rectangular  "
              className="m-10 mt-5  w-[35vw] max-sm:w-[90vw] max-sm: max-sm:mx-5"
              height={500}
            />
          </div>
        </div>
        <div className="ml-[20vw] m-10 max-sm:ml-0 ">
          <div className="flex gap-1 ml-[5vw] ">
            <Skeleton variant="circular" height={50} width={50} />
            <div>
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div>
            <Skeleton
              variant="rectangular  "
              className="m-10 mt-5  w-[35vw] max-sm:w-[90vw] max-sm: max-sm:mx-5"
              height={500}
            />
          </div>
        </div>
        <div className="ml-[20vw] m-10 max-sm:ml-0 ">
          <div className="flex gap-1 ml-[5vw] ">
            <Skeleton variant="circular" height={50} width={50} />
            <div>
              <Skeleton height={20} width={70} />
              <Skeleton height={20} width={50} />
            </div>
          </div>
          <div>
            <Skeleton
              variant="rectangular  "
              className="m-10 mt-5  w-[35vw] max-sm:w-[90vw] max-sm: max-sm:mx-5"
              height={500}
            />
          </div>
        </div>
       
      

        <MenuItems />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex justify-between sm:hidden">
          <Logo/>
          <NotificationsActiveIcon className="m-5 sm:hidden"/>
        </div>

        <MenuItems />

        <UserBox />

        <div className="ml-[20%] w-[80%]   flex flex-col-reverse min-h-max max-sm:ml-0 max-sm:w-[100vw] ">
          {feedPosts.slice(2, -1).map((item, index) => {
            return (
              <FeedPosts
                key={item._id}
                caption={item.caption}
                likes={item.likes}
                picturePath={item.picturePath}
                comments={item.comments}
                postId={item._id}
                postUserId={item.userId}
                location={item.location}
              />
            );
          })}
          <NewUsersBox />

          {feedPosts.slice(0, 2).map((item, index) => {
            return (
              <FeedPosts
                key={index}
                caption={item.caption}
                likes={item.likes}
                picturePath={item.picturePath}
                comments={item.comments}
                postId={item._id}
                postUserId={item.userId}
                location={item.location}
              />
            );
          })}

          <SuggestionBox />

          {feedPosts.slice(-1).map((item, index) => {
            return (
              <FeedPosts
                key={index}
                caption={item.caption}
                likes={item.likes}
                picturePath={item.picturePath}
                comments={item.comments}
                postId={item._id}
                postUserId={item.userId}
                location={item.location}
              />
            );
          })}
          <h1 className="bg-white  text-xl p-5 z-10 ">Latest Post</h1>
        </div>
        <PopUp openPopup={modal} setOpenPopup={setModal} title="Create Post">
          <CreatePost />
        </PopUp>
      </div>
    );
  }
};

export default ExplorePage;
