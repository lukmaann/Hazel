import SuggestedUsers from "./SuggestedUser";
import { AllUsersStore, useUserStore } from "../../../store/store";

const NewUsersBox = () => {
  const loggedUser = useUserStore((state) => state.user);

  const { Users } = AllUsersStore((state) => state);
  const FilteredUsers=Users.filter((item)=>{
    return loggedUser._id!==item._id && !loggedUser.friends.includes(item._id)
  })
  
  return (
    <div className=" w-[80vw] h-[50vh] max-sm:w-[100vw] max-sm:h-[38vh]  bg-white border-y max-sm:bg-gray-100 p-2 ">
        <div className="w-[100%] h-[10%]  px-2 text-start  font-medium"> Newly Joined</div>
        <div className="flex overflow-auto noscrollbar w-[100%] h-[90%] mt-2">
        {
          FilteredUsers.slice(0).reverse().slice(0,4).map((item,index)=>{
            if(loggedUser._id!==item._id && !loggedUser.friends.includes(item._id)){
              return <SuggestedUsers key={index} profile={item.profile} name={item.username} connections={item.friends} id={item._id} caption="Newly Joined"/>
            }
          })
        }
       


        </div>

    </div>
  );
};

export default NewUsersBox;
