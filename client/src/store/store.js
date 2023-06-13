/* eslint-disable no-unused-labels */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
  },
  friends: [],
  setUsername: (name) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
  setFriends: (data) => set(() => ({ friends: data })),
}));

export const useModal = create((set) => ({
  modal: false,
  setModal: (payload) => set({ modal: payload }),
  usernameModal:false,
  setUsernameModal:(payload)=>set({usernameModal:payload})
}));



export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (data) => set({ user: data }),
      updateUserData:({firstName,lastName,email,profile,address,mobile})=>set((state)=>({user:{...state.user,firstName,lastName,email,profile,address,mobile}}))
   
    }),
    {
      name: "UserData",
    }
  )
);


export const usePostStore=create(
  persist(
    (set)=>({
      feedPosts:[],
      setPosts:(data)=>(set({feedPosts:data}))
    }),
    {
      name:"Posts"
    }
  )
)