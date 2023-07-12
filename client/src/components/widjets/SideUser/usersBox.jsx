import { toast } from "react-hot-toast";
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

  return <div className=" px-10  border-black   bg-white  w-[80%] flex justify-start  items-center ml-[20%] fixed z-10 h-[12vh]  ">
    {
      Users.map((item,index)=>{
        if(loggedUser._id!==item._id){
          return <UsersProfile key={index} img={item.profile} name={item.firstName}/>
        }

      })
    }
  </div>;
};

export default UserBox;
