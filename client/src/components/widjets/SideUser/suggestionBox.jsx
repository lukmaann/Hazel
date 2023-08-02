import SuggestedUsers from "./SuggestedUser";
import { AllUsersStore, useUserStore } from "../../../store/store";

const SuggestionBox = () => {
  const loggedUser = useUserStore((state) => state.user);

  

  const { Users } = AllUsersStore((state) => state);

  const FilteredUsers=Users.filter((item)=>{
    return loggedUser._id!==item._id && !loggedUser.friends.includes(item._id)
  })

  
  
  return (
    <div className=" w-[80vw] h-[50vh] max-sm:w-[100vw] max-sm:h-[38vh]  bg-white border-y max-sm:bg-gray-100 p-2 ">
        <div className="w-[100%] h-[10%]  px-2 text-start  font-medium"> Suggestions For You</div>
        <div className="flex overflow-auto noscrollbar w-[100%] h-[90%] mt-2">
        {
          FilteredUsers.slice(0,5).map((item,index)=>{
            
              return <SuggestedUsers key={index} profile={item.profile} name={item.username} connections={item.friends} id={item._id}/>
          
          })
        }
       


        </div>

    </div>
  );
};

export default SuggestionBox;
