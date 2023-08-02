
import { getAllUsers } from "../../../helper/helper";
import { AllUsersStore, useUserStore } from "../../../store/store";
import { useEffect } from "react";
import UsersProfile from "./otherUsersProfile";
import { CircularProgress, LinearProgress } from "@mui/material";
import {Skeleton} from "@mui/material";
const UserBox = () => {
  const loggedUser = useUserStore((state) => state.user);

  const { Users, SetUsers } = AllUsersStore((state) => state);

  useEffect(() => {
    const users = getAllUsers();
    users.then((data) => {
      SetUsers(data);
    });
  }, []);


  return <div className=" px-10  border-black bg pb-2 overflow-x-auto   w-[80%] flex  justify-start items-end  items-center ml-[20%]  h-min max-sm:w-[100vw] max-sm:ml-0  max-sm:p-0 noscrollbar ">
    {

      Users.length===0?<div >
      <LinearProgress color="inherit" />
      
      <div className="flex">

      <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
          <Skeleton
            variant="circular"
            height={70}
            width={70}
            className=" m-5 min-w-[70px]"
          />
      </div>

          </div>:
      Users.map((item,index)=>{
        if(loggedUser.friends.includes(item._id) ){
         
          return <UsersProfile key={index} img={item.profile} name={item.username}/>
        }

      })
    }
 
  </div>;
};

export default UserBox;
