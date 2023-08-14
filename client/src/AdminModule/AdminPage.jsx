import ReportBox from "./ReportBox";
import { Toaster } from "react-hot-toast";
import { UseReportStore } from "../store/store";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate=useNavigate()
  const reports=UseReportStore((state)=>state.Reports)

  const logout=()=>{
    localStorage.clear();
    navigate('/')
  }
  return (
   <div className="h-screen w-[100vw]  bg-black p-5">
   <Toaster position="bottom-right"></Toaster>
   <div className="flex text-white bg-black sticky top-5 text-2xl mb-5 justify-between">
   <h1 > Hazel Reports</h1>
   <button onClick={logout}><LogoutIcon/></button>
   </div>
   <div className="flex">
    <ReportBox/>
  
   </div>
   

   </div>
  );
};

export default AdminPage;
