import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://hazelsocialappbackend.onrender.com/"||"http://localhost:3000/";




const useFecth=()=>{
    const [userData,setUserdata]=useState({
        isLoading:false,
        Data:null,
        serverError:null
    })


    useEffect(()=>{
        const fecth=async ()=>{
            try {
                setUserdata((prev)=>({...prev,isLoading:true}))
                const {data,status}=await axios.get('/api/users');
                

                if(status==200){
                    setUserdata((prev)=>({...prev,isLoading:false}));
                    setUserdata((prev)=>({...prev,Data:data}));
                }else{
                    setUserdata((prev)=>({...prev,serverError:"cannot get data",isLoading:false}));
                }
                
                
            } catch (error) {
                setUserdata((prev)=>({...prev,serverError:error}))
            }
        }

        fecth();
    },[])


    return [userData,setUserdata];



  
}


export default useFecth;