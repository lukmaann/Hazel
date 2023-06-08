import Avatar from "../../assets/profile.png";
import useFecth from "../../hooks/fecth.hooks";


const HomeProfile = () => {
    const [{apiData,isLoading,serverError}]=useFecth();

// if(isLoading)  return <h1 className="flex justify-center p-10">Loading...</h1>
if(serverError) return <h1>{serverError.message}</h1>

if(!isLoading)
  return <div className="ml-64 flex flex-col items-center p-3 w-10/12">
  <div className="w-11/12 h-1/3 flex items-center border-b">
    <div className=" rounded-full h-32 w-32">
        <img className="rounded-full h-32 w-32 hover:cursor-pointer  hover:border-blue-400 border-4" src={apiData?.profile||Avatar}/>
    </div>
  </div>
  
  </div>;
};
export default HomeProfile;
