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
  logOutmodal: false,
  setLogoutModal: (payload) => set({ logOutmodal: payload }),
  postModal: false,
  setPostModal: (payload) => set({ postmodal: payload }),
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

      updateFriends: (payload) =>
        set((state) => ({
          user: {
            ...state.user,
            friends: payload,
          },
        })),
    }),

    {
      name: "UserData",
    }
  )
);

export const usePostStore = create((set) => ({
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

  delPost: (payload) =>
    set((state) => ({
      feedPosts: state.feedPosts.filter((posts) => {
        return posts._id !== payload;
      }),
    })),
}));

export const AllUsersStore = create((set) => ({
  Users: [],
  SetUsers: (payload) => set({ Users: payload }),
}));

export const UseReportStore = create((set) => ({
  Reports: [],
  setReports: (payload) => set({ Reports: payload }),
}));

export const UseViewReportStore = create((set) => ({
  Report: {
    username: "",
    postimg: "",
    postId: "",
    likes: "",
    caption: "",
    reportedBy: "",
    content:""
  },
  setViewReport: ({ username, caption, reportedBy, likes, postId,postimg,content }) =>
  
    set((state) => ({Report:{
      ...state.Report,
      username,
      caption,
      postId,
      reportedBy,
      likes,
      postimg,
      content
    }})),
    
}));
