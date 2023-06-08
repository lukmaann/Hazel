import EditIcon from "@mui/icons-material/Edit";
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from "react-router-dom";



const MenuItems=()=>{
    const navigate=useNavigate();

    const logout=()=>{
      localStorage.removeItem("token");
      navigate("/")
    }

    



    return(
        <div className=" fixed bottom-0 bg-white text-black pl-3 flex flex-col w-1/5 max-h-screen">
         
      
          <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
            <ExploreIcon/>
            <button>Explore</button>
          </div>

          <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
            <AddIcon/>
            <button>Create Post</button>
          </div>
          <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
            <EditIcon />
            <button onClick={()=>{navigate("/editprofile")}}>Edit Profile</button>
          </div>
          <div className="  m-3 w-11/12 items-center hover:bg-gray-100 h-10 gap-4 rounded-l p-1 flex justify-start ">
            <ArrowOutwardIcon/>
            <button onClick={logout}>LogOut</button>
          </div>
        </div>
    )
}

export default MenuItems