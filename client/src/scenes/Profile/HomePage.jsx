// import { useAuthStore } from "../../store/store"

// ------------------material icons-------------

import Navbar from "../../components/Navbar";
import MenuItems from "../../components/widjets/menuItems";
import HomeProfile from "../../components/widjets/homeProfile";

const HomePage = () => {
 

  // const friends=useAuthStore(state=>state.friends)

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex  h-screen ">
        <MenuItems/>
       <HomeProfile/>
      </div>
    </div>
  );
};

export default HomePage;
