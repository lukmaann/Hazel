import { toast } from "react-hot-toast";
import { getAllUsers } from "../../../helper/helper";
import SideUsers from "./SideUser";
import { AllUsersStore, useUserStore } from "../../../store/store";
import { useEffect } from "react";

const SideUserBox = () => {
    const loggedUser=useUserStore((state)=>state.user)

    const {Users,SetUsers}=AllUsersStore((state)=>state);

    useEffect(()=>{
        const users=getAllUsers();
        users.then((data)=>{
            SetUsers(data)
        })
    },[])
  

  



  

  return <div className="h-[35vh] my-4  w-[110%] overflow-y-auto ">
  {
    Users.map((item,index)=>{
        return item._id!==loggedUser._id && item.firstName&&<SideUsers key={index} img={item.profile} name={item.firstName}/>
    })
  }
  
  </div>;
};

export default SideUserBox;
