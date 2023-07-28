/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import Avatar from "../../../assets/profile.png"

const UsersProfile = (props) => {
  const navigate = useNavigate();
  const { img, name } = props;
  return (
    <div
      onClick={() => navigate("/user", { state: { id: name } })}
      className=" w-min bg-white  h-[90%] my-4  flex  justify-center flex-col  px-3 items-center max-sm:z-30 max-sm:mt-10 max-sm:mb-0 hover:cursor-pointer"
    >
      <div className="h-[60px] w-[60px] p-[3px]   bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500  justify-center items-center flex rounded-full mt-[20px] ">
        <img
          src={img||Avatar}
          className=" border-white border-2  shadow-lg rounded-full h-[100%]   w-[100%]"
          alt=""
        />
      </div>
      <span className="font-semibold text-xs  mt-2"> {name}</span>
    </div>
  );
};

export default UsersProfile;
