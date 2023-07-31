import MenuItems from "../../components/widjets/menuItems";
import PopUp from "../../components/widjets/PopUp";
import { useModal } from "../../store/store";
import CreatePost from "../../components/CreatePost";

import FeedPosts from "../../components/widjets/posts/FeedPosts";
import { usePostStore } from "../../store/store";
import UserBox from "../../components/widjets/SideUser/usersBox";
import Logo from "../../components/widjets/logo";
import SuggestionBox from "../../components/widjets/SideUser/suggestionBox";
// import { Hidden } from "@mui/material";
const ExplorePage = () => {
  const feedPosts = usePostStore((state) => state.feedPosts);

  const { modal, setModal } = useModal((state) => state);
  if (feedPosts == null) {
    return <h1 className="flex justify-center p-10 ">Loading...</h1>;
  } else {
    return (
      <div>
      
      <Logo/>
      
        <MenuItems />

        <UserBox />
        
        <div className="ml-[20%] w-[80%]   flex flex-col-reverse min-h-max max-sm:ml-0 max-sm:w-[100vw] ">
        {/* <SuggestionBox/> */}
        
          {feedPosts.slice(0,-1).map((item, index) => {
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
          
          <SuggestionBox/>
          
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
