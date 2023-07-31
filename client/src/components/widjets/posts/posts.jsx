/* eslint-disable react/prop-types */
import { useState } from "react";
import Heart from "react-heart";
import { usePostStore, useUserStore } from "../../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletepost } from "../../../helper/helper";
import { toast } from "react-hot-toast";
const Posts = (props) => {
  const loggedUser = useUserStore((state) => state.user);
  const delpost = usePostStore((state) => state.delPost);

  const [over, setOver] = useState(false);

  const { picturePath, likes, postUserId, id } = props;
  const likeCount = Object.keys(likes).length;

  const delPost = () => {
    const delpostpromise = deletepost(id);

    toast.promise(delpostpromise, {
      loading: "deleting",
      success: "Post deleted",
      error: "error",
    });

    delpostpromise.then(() => {
      delpost(id);
    });
  };

  return (
    <div
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => setOver(false)}
      className="h-[250px] w-[250px] relative rounded-s max-sm:w-[30vw] max-sm:h-[150px] border border-white"
    >
      <div className="w-[100%] h-[85%] max-sm:h-[100%]">
        <img src={picturePath} alt="" className="h-[100%] w-[100%] " />
      </div>
      <div className="px-1 flex items-center justify-between h-[15%] ">
        <div className="flex">
          <Heart className="w-5 max-sm:w-2 max-sm:hidden" onClick={() => {}} isActive={true} />
          <h1 className="text-black px-2 max-sm:hidden">{likeCount}</h1>
        </div>
        
        {over && postUserId === loggedUser._id && (

          <DeleteIcon onClick={delPost} className="text-black hover:cursor-pointer max-sm:absolute max-sm:top-1 max-sm:text-gray-400 " />
        )}
      </div>
    </div>
  );
};

export default Posts;
