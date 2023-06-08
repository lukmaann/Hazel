import {create} from "zustand"

export const useAuthStore=create((set)=>({
    auth:{
        username:'',
        active:false
    },
    friends:[]
    ,
    setUsername:(name)=>set((state)=>({auth:{...state.auth,username:name}})),
    setFriends:(data)=>set(()=>({friends:data}))
}))