/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import Avatar from "../../../assets/profile.png"
import VerifiedIcon from '@mui/icons-material/Verified';
const verifiedUsers=["lukmaan","Lukmaan","Vijay","vijay","Gangadhar","gangadhar"]


const UsersProfile = (props) => {
  const navigate = useNavigate();
  const { img, name } = props;
  return (
    <div
      onClick={() => navigate("/user", { state: { id: name } })}
      className=" w-max bg-white  h-[90%] my-4  flex  justify-center flex-col  px-3 items-center max-sm:z-30  max-sm:m-2 bg-white hover:cursor-pointer"
    >
      <div className="max-sm:h-[20vw] h-[70px] w-[70px] max-sm:w-[20vw] p-[3px]   bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500  justify-center items-center flex rounded-full  ">
        <img
          src={img||Avatar}
          className=" border-white border-2 object-cover shadow-lg rounded-full h-[100%]   w-[100%]"
          alt=""
        />
      </div>
      <span className="font-semibold  text-center text-xs w-max mt-2"> {name}{verifiedUsers.includes(name)&&<VerifiedIcon className="p-[5px]"/>}</span>
    </div>
  );
};

export default UsersProfile;
