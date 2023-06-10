import EditIcon from "@mui/icons-material/Edit";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import useFecth from "../../hooks/fecth.hooks";
// ------------------------components-----------
import Logo from "./logo";
import { useModal } from "../../store/store";
import Avatar from "../../assets/profile.png"

const MenuItems = () => {
  const [{isLoading,serverError,apiData}]=useFecth();
  const {setModal}=useModal();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className=" fixed bottom-0 bg-white border-r border-blue-200 text-black pl-3 flex flex-col w-1/5 h-screen">
      <Logo />
      <div className="fixed bottom-0 border-gray-400 border-t">
        <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
          <ExploreIcon />
          <button>Explore</button>
        </div>

        <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
          <AddIcon />
          <button onClick={()=>setModal(true)}>Create Post</button>
        </div>
        <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
          <EditIcon />
          <button
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Edit Profile
          </button>
        </div>
        <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
          {/* <HomeIcon /> */}
          <img src={apiData?.profile||Avatar} className="w-7 rounded-full h-7" alt="" />
          <button
            onClick={() => {
              navigate("/homepage");
            }}
          >
            Profile
          </button>
        </div>
        <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
          <ArrowOutwardIcon />
          <button onClick={logout}>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
