import useFecth from "../hooks/fecth.hooks";
import { useLocation } from "react-router-dom";
import MenuItems from "../components/widjets/menuItems";
import UserProfile from "./widjets/UserProfile";
import { Skeleton } from "@mui/material";

const UserPage = () => {
  const location = useLocation();
  const userName = location.state.id;
  const [{ apiData, isLoading, serverError }] = useFecth(`user/${userName}`);

  if (isLoading)
    return (
      <div>
        <MenuItems />
        <div className="flex ml-[20vw] max-sm:ml-0">
          <Skeleton
            variant="circular"
            className="m-10"
            height={70}
            width={70}
          />
          <div className="m-12 ">
            <Skeleton
              variant="rectangular"
              className="max-sm:w-[130px] w-[200px ] m-1  "
            />
            <Skeleton variant="rectangular" className="max-sm:w-[100px] w-[150px] m-1" />
          </div>
         
        </div>
        <div className="flex items-start max-sm:w-[100vw] flex-wrap m-20  ml-[20vw] max-sm:ml-0">
        <Skeleton variant="rectangular" className="w-[20vw] max-sm:min-w-[30vw] m-1" height={120}/>
        <Skeleton variant="rectangular" className="w-[20vw] max-sm:min-w-[30vw] m-1" height={120}/>
        <Skeleton variant="rectangular" className="w-[20vw] max-sm:min-w-[30vw] m-1" height={120}/>
          
          <Skeleton variant="rectangular" className="w-[20vw] max-sm:min-w-[30vw] m-1" height={120}/>
          

          

          </div>
      </div>
    );
  if (serverError) return <h1>{serverError.message}</h1>;

  return (
    <div>
      <MenuItems />
      {apiData !== null && <UserProfile user={apiData} />}
    </div>
  );
};

export default UserPage;
