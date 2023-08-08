/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthoriseUser=({children})=>{
    const token=localStorage.getItem("token");
    if(!token){
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children
}

export const AuthoriseUsername=({children})=>{
    const username=useAuthStore.getState().auth.username
    if(!username){
        return <Navigate to={"/"} replace={true}></Navigate>
    }
    return children
}


export const AuthorisedAdmin=({children})=>{
    const admintoken=localStorage.getItem('AdminToken');
    if(!admintoken){
        return <Navigate to={'/admin'} replace={true}></Navigate>
    }
    return children
}