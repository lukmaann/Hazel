import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "../../assets/profile.png";
import useFecth from "../../hooks/fecth.hooks";
import { useState } from "react";


const impressions = Math.floor(Math.random() * 10);
const HomeProfile = () => {


  const [click, setclick] = useState(false);
  
  


  const [{ apiData, isLoading, serverError }] = useFecth();
 

  if (serverError) return <h1>{serverError.message}</h1>;

  if (!isLoading)
    return (
      <div className="ml-64 flex flex-col items-center p-3 w-10/12">
        <div className="w-11/12 h-1/3 flex items-center border-b">
          <div className=" rounded-full h-32 w-32">
            <img
              className="rounded-full h-32 w-32 hover:cursor-pointer  hover:border-blue-400 border-4"
              src={apiData?.profile || Avatar}
            />
          </div>
          <div className="w-8/12 ml-8 p-8 h-[90%]">
            <div className="flex gap-4">
              <h1 className="text-2xl font-normal">{apiData?.username} </h1>
              <button onClick={() => setclick(!click)}>
                <ExpandMoreIcon />
              </button>
            </div>
            {click && <button className="ml-24 ">SignOut</button>}

            <div className="flex gap-4">
              <h1 className="text-xl mt-3 font-normal">
                {apiData?.friends.length} Friends{" "}
              </h1>
              <h1 className="text-xl mt-3 font-normal">{impressions} Views</h1>
            </div>

            {apiData?.firstName ? (
              <h1 className="text-l mt-3 font-bold">
                {apiData?.firstName} {apiData?.lastName}
              </h1>
            ) : (
              <h1>Please update your profile</h1>
            )}
          </div>
        </div>
      </div>
    );
};
export default HomeProfile;
