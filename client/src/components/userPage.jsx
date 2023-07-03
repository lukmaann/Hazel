import useFecth from "../hooks/fecth.hooks"
import { useLocation, useNavigate } from "react-router-dom"
import MenuItems from "../components/widjets/menuItems";
import UserProfile from "./widjets/UserProfile";
import { useUserStore } from "../store/store";

const UserPage=()=>{
    const location=useLocation();
    const loggedUser=useUserStore(state=>state.user);
    const userName=location.state.id
    const [{apiData,isLoading,serverError}]=useFecth(`user/${userName}`);



    const navigate=useNavigate();
    if(userName===loggedUser.firstName){
        navigate('/homepage')
    }

    

    if (isLoading)
    return <h1 className="flex justify-center p-10">Loading...</h1>;
    if (serverError) return <h1>{serverError.message}</h1>;

    return <div>
        <MenuItems/>
        { apiData!==null && <UserProfile user={apiData} />}
       
    </div>
}


export default UserPage