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
    <div>
    <Toaster position="bottom-right" reverseOrder={false}/>
      <nav className="max-w-[100vw] bg-white shadow-2xl flex   justify-between text-black  items-center px-10 h-[10vh]">
        <h1 className="text-2xl">Hazel Dashboard</h1>
        <button onClick={logout}><LogoutIcon /></button>
        
      </nav>

      <div className="h-screen  p-10 flex justify-between">
        <div className="w-[40%] h-[90%] ">
          <div className="text-center bg-black text-white  h-[10%] flex items-center justify-between px-5 text-xl">
            <h1> Manage Reports</h1>
            <h1>Total reports : { reports.length}</h1>
          </div>
          <div className=" w-[100%] h-[90%] border-black border">
            <ReportBox/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
