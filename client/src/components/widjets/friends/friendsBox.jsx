import FriendsUnit from "./friendsUnit";


import { AllUsersStore, useUserStore } from "../../../store/store";

const FriendsBox = () => {
  const { Users } = AllUsersStore((state) => state);
  const loggedUser = useUserStore((state) => state.user);

  return (
    <div  className={`w-[100%] h-[40%] mt-20 my-3   overflow-auto noscrollbar `}>
      {Users.map((item, index) => {
        if (loggedUser.friends.includes(item._id)) {
          
          return <FriendsUnit key={index} img={item.profile} name={item.firstName} />;
        }
        
      })}
    </div>
  );
};

export default FriendsBox;
