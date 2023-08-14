import ReportBox from "./ReportBox";
import { Toaster } from "react-hot-toast";
import { UseReportStore } from "../store/store";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import ViewPost from "./viewPost";

const AdminPage = () => {
  const navigate = useNavigate();
  const reports = UseReportStore((state) => state.Reports);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="h-[600px] w-[100vw] text-white bg-black p-5">
      <Toaster position="bottom-right"></Toaster>
      <div className="flex text-white bg-black sticky top-5 text-3xl  mb-5 justify-between">
        <h1 className="font-extrabold font-mono"> Hazel Reports</h1>
        <button onClick={logout}>
          <LogoutIcon />
        </button>
      </div>
      <h1 >
        <ReportIcon fontSize="small " /> {reports.length} {reports.length===1?"Report":"Reports"}{" "}
      </h1>
      <div className="flex h-[90%] w-[100%] justify-between">
        <ReportBox />
        <ViewPost/>
      </div>
    </div>
  );
};

export default AdminPage;
