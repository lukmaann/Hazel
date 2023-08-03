/* eslint-disable react/prop-types */
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from '@mui/icons-material/Logout';
import ExploreIcon from "@mui/icons-material/Explore";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";
import PopUp from "./PopUp";
import Styles from "../Components.module.css";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Logo from "./logo";
// ------------------------components-----------
import { useModal } from "../../store/store";
import Avatar from "../../assets/profile.png";

// import FriendsBox from "./friends/friendsBox";

const MenuItems = () => {
  
  const user = useUserStore((state) => state.user);
  const { setModal, setUsernameModal, usernameModal } = useModal();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };
 

  return (
    <aside className={`${Styles.menuaside} z-20`}>
    <div className="max-sm:hidden">
    <Logo/>
    </div>
      
      {/* <FriendsBox /> */}
      <div className={`${Styles.menubox} `}>
        <div className={Styles.menuitems}>
          <ExploreIcon onClick={() => navigate("/explore")} />
          <button onClick={() => navigate("/explore")}>Explore</button>
        </div>

       
        <div className={Styles.menuitems}>
          <EditIcon
            onClick={() => {
              navigate("/editprofile");
            }}
          />
          <button
            onClick={() => {
              navigate("/editprofile");
            }}
          >
            Edit Profile
          </button>
        </div>
        <div className={`${Styles.menuitems} max-sm:hidden`}>
         <NotificationsActiveIcon/>
          <button
            
          >
            Notification
          </button>
        </div>
        <div className={Styles.menuitems}>
          <AddIcon
            onClick={() => {
              user.firstName ? setModal(true) : setUsernameModal(true);
            }}
          />
          <button
            onClick={() => {
              user.firstName ? setModal(true) : setUsernameModal(true);
            }}
          >
            Create Post
          </button>
        </div>
        
        <div className={Styles.menuitems}>
          <img
            src={user.profile || Avatar}
            className="w-7 rounded-full h-7 border-2 border-black "
            alt=""
            onClick={() => {
              navigate("/homepage");
            }}
          />
          <button
            onClick={() => {
              navigate("/homepage");
            }}
          >
            Profile
          </button>
        </div>
       
       
        <div
          className={` ${Styles.menuitems}   items-center  h-10  rounded-l flex`}
        >
          <LogoutIcon onClick={(logout)} />
          <button  onClick={logout}>LogOut</button>
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
      <></>
    </aside>
  );
};

export default MenuItems;
