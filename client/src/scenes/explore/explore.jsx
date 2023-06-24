import MenuItems from "../../components/widjets/menuItems";
import PopUp from "../../components/widjets/PopUp";
import { useModal } from "../../store/store";
import CreatePost from "../../components/CreatePost";

import FeedPosts from "../../components/widjets/posts/FeedPosts";
import { usePostStore } from "../../store/store";
const ExplorePage = () => {
  const feedPosts = usePostStore((state) => state.feedPosts);

  const { modal, setModal } = useModal((state) => state);
  if (feedPosts == null) {
    return <h1 className="flex justify-center p-10">Loading...</h1>;
  } else {
    return (
      <div>
        <MenuItems />
        <div className="ml-[20%] w-[80%] min-h-max">
          {feedPosts
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <FeedPosts
                  key={index}
                  caption={item.caption}
                  likes={item.likes}
                  picturePath={item.picturePath}
                  comments={item.comments}
                  postId={item._id}
                  firstName={item.firstName}
                  profile={item.profile}
                />
              );
            })}
        </div>
        <PopUp openPopup={modal} setOpenPopup={setModal} title="Create Post">
          <CreatePost />
        </PopUp>
      </div>
    );
  }
};

export default ExplorePage;
