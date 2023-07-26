import useFecth from "../hooks/fecth.hooks"
import { useLocation } from "react-router-dom"
import MenuItems from "../components/widjets/menuItems";
import UserProfile from "./widjets/UserProfile";

const UserPage=()=>{
    const location=useLocation();
    const userName=location.state.id
    const [{apiData,isLoading,serverError}]=useFecth(`user/${userName}`);
    
    



   

    

    if (isLoading)
    return <h1 className="flex justify-center p-10">Loading...</h1>;
    if (serverError) return <h1>{serverError.message}</h1>;

    return <div>
        <MenuItems/>
        { apiData!==null && <UserProfile user={apiData} />}
       
    </div>
}


export default UserPage