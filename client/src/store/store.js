/* eslint-disable no-unused-labels */
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

export const useModal=create((set)=>({
    modal:false,
    setModal:(payload)=>set({modal:payload}),
    
}))

export const usePostStore=create((set)=>({
    feedPosts:[],
    setFeedPosts:(data)=>set({feedPosts:data})
}))

export const useUserStore=create((set)=>({
    user:null,
    setUser:(data)=>set({user:data})

}))