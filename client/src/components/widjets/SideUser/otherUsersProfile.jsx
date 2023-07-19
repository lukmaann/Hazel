/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const UsersProfile = (props) => {
  const navigate = useNavigate();
  const { img, name } = props;
  return (
    <div
      onClick={() => navigate("/user", { state: { id: name } })}
      className=" w-[10%]  h-[90%] my-4  flex justify-center flex-col  px-3 items-center hover:cursor-pointer"
    >
      <div className="h-[70px] w-[70px] rounded-full mt-[20px] ">
        <img
          src={img}
          className=" hover:border-purple-500  shadow-lg rounded-full h-[100%] border-2  w-[100%]    "
          alt=""
        />
      </div>
      <t className="font-semibold text-xs  mt-2"> {name}</t>
    </div>
  );
};

export default UsersProfile;
