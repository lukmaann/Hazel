import MenuItems from "../../components/widjets/menuItems";
import HomeProfile from "../../components/widjets/homeProfile";
import PopUp from "../../components/widjets/PopUp";
import { useModal } from "../../store/store";
import CreatePost from "../../components/CreatePost";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  const { modal, setModal } = useModal();

  return (
    <div className="min-h-screen">
      <Toaster
        toastOptions={{ style: { background: "#D2D2C0" } }}
        position="top-center"
        reverseOrder={false}
      ></Toaster>
      <div className="flex  h-screen ">
        <MenuItems />
        <HomeProfile />
      </div>
      <PopUp openPopup={modal} setOpenPopup={setModal} title="Create Post">
        <CreatePost />
      </PopUp>
    </div>
  );
};

export default HomePage;
