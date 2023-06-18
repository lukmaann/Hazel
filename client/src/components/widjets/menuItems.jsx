import EditIcon from "@mui/icons-material/Edit";
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";
import PopUp from "./PopUp";
import Styles from "../../styles/username.module.css"

// ------------------------components-----------
import Logo from "./logo";
import { useModal } from "../../store/store";
import Avatar from "../../assets/profile.png";

const MenuItems = () => {
  const user = useUserStore((state) => state.user);
  const { setModal, setUsernameModal, usernameModal } = useModal();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    localStorage.removeItem("Posts");

    navigate("/");
  };

  return (
    <div className=" fixed bottom-0 bg-white border-r border-blue-200 text-black pl-3 flex flex-col w-1/5 h-screen ">
      <Logo />
      <div className="fixed bottom-0 border-gray-400 border-t">
        <div className={Styles.menuitems}>
          <ExploreIcon />
          <button onClick={() => navigate("/explore")}>Explore</button>
        </div>

        <div className={Styles.menuitems}>

          <AddIcon />
          <button
            onClick={() => {
              user.firstName ? setModal(true) : setUsernameModal(true);
            }}
          >
            Create Post
          </button>
        </div>
        <div className={Styles.menuitems}>

          <EditIcon />
          <button
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Edit Profile
          </button>
        </div>
        <div className={Styles.menuitems}>

          {/* <HomeIcon /> */}
          <img
            src={user.profile || Avatar}
            className="w-7 rounded-full h-7"
            alt=""
          />
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
      <PopUp
        openPopup={usernameModal}
        setOpenPopup={setUsernameModal}
        title="Update alert"
      >
        <div>
          <h1>Before uploading post please update profile</h1>
          <button
            onClick={() => {
              navigate("/editprofile");
              setUsernameModal(false);
            }}
            className={`${Styles.menuitems} w-max ml-0 bg-pink-400 border-b-4 border-black borde`} 
          >
            Update Now
          </button>
        </div>
      </PopUp>
    </div>
  );
};

export default MenuItems;
