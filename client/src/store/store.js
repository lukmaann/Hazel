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
  usernameModal: false,
  setUsernameModal: (payload) => set({ usernameModal: payload }),
  logOutmodal:false,
  setLogoutModal:(payload)=>set({logOutmodal:payload}),
  postModal:false,
  setPostModal:(payload)=>set({postmodal:payload})
}));

export const useUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (data) => set({ user: data }),
      updateUserData: ({
        firstName,
        lastName,
        email,
        profile,
        address,
        mobile,
      }) =>
        set((state) => ({
          user: {
            ...state.user,
            firstName,
            lastName,
            email,
            profile,
            address,
            mobile,
          },
        })),
    }),
    {
      name: "UserData",
    }
  )
);

export const usePostStore = create(
  persist(
    (set) => ({
      feedPosts: [],
      setPosts: (data) => set({ feedPosts: data }),
      commentPost: ({ postId, comment }) =>
        set((state) => ({
          ...state,
          feedPosts: state.feedPosts.map((item) => {
            if (item._id === postId) {
              return {
                ...item,
                comments: [...item.comments, comment],
              };
            } else {
              return item;
            }
          }),
        })),
      likePost: (post) =>
        set((state) => ({
          feedPosts: state.feedPosts.map((item) => {
            if (post._id === item._id) {
              return {
                ...item,
                likes: post.likes,
              };
            } else {
              return item;
            }
          }),
        })),
    }),
    {
      name: "Posts",
    }
  )
);


