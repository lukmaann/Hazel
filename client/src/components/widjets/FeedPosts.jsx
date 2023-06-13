import { usePostStore } from "../../store/store";
import FavoriteIcon from '@mui/icons-material/Favorite';


const FeedPosts = () => {
  const feedPosts = usePostStore((state) => state.feedPosts);

  return (
    <div className="p-10 ">
      <div className="w-[60%] h-[90vh] m-8 border border-black bg-white rounded-lg">
        <div className="w-[100%] h-16  flex items-center p-4 ">
          <img
            src={feedPosts[0].profile}
            className="w-10 h-10 border-2  mr-4 border-gray-300 rounded-full "
            alt="profile img"
          />
          <h1 className="font-bold font-sans hover:text-gray-500 cursor-pointer">
            {feedPosts[0].firstName}{" "}
          </h1>
          <h1 className="ml-[60%]">...</h1>
        </div>
        <div className="h-[78%] w-[100%] rounded-2xl flex text-white justify-center items-center">
       <img src={feedPosts[3].picturePath} className="h-[100%]  w-[100%]" alt="" />


        </div>
        <div className="flex px-8 h-14 items-center">
        <FavoriteIcon  className="text-red-500"/>

        </div>
      </div>
    </div>
  );
};

export default FeedPosts;
