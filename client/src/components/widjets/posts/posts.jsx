/* eslint-disable react/prop-types */
import Heart from "react-heart";

const Posts = (props) => {
    const {picturePath,likes}=props
    const likeCount=Object.keys(likes).length
  return (
    <div className="h-[250px] w-[250px] m-1 rounded-lg rounded-t-none border border-b-4 hover:border-black border-gray-500">
      <div className="w-[100%] h-[85%]">
        <img src={picturePath} alt="" className="h-[100%] w-[100%]" />
      </div>
      <div className="px-1 flex items-center h-[15%]">
        <Heart className="w-5 " onClick={() => {}} isActive={true} />
       <h1 className="text-black px-2">{likeCount}</h1>

      </div>
    </div>
  );
};

export default Posts;
