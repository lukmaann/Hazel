
import { getAllUsers } from "../../../helper/helper";
import { AllUsersStore, useUserStore } from "../../../store/store";
import { useEffect } from "react";
import UsersProfile from "./otherUsersProfile";

const UserBox = () => {
  const loggedUser = useUserStore((state) => state.user);

  const { Users, SetUsers } = AllUsersStore((state) => state);

  useEffect(() => {
    const users = getAllUsers();
    users.then((data) => {
      SetUsers(data);
    });
  }, []);

  return <div className=" px-10  border-black  pb-2 overflow-x-auto   w-[80%] flex  justify-start items-end  items-center ml-[20%] z-10 h-[20vh] max-sm:w-[100vw] max-sm:ml-0  max-sm:p-0 noscrollbar ">
    {
      Users.map((item,index)=>{
        if(loggedUser._id!==item._id){
          return <UsersProfile key={index} img={item.profile} name={item.username}/>
        }

      })
    }
 
  </div>;
};

export default UserBox;
