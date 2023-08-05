import axios from "axios";
import jwt_decode from "jwt-decode";

// eslint-disable-next-line no-undef
axios.defaults.baseURL =
  "https://hazelsocialappbackend.onrender.com/" || "http://localhost:3000";

export const getUsername = async () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("session expired!!");
  let decode = jwt_decode(token);

  return decode;
};

export const authenticate = async (username) => {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "User Not Found!!" };
  }
};

export const getUser = async (username) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);

    return { data };
  } catch (error) {
    return { error: "password not match" };
  }
};

export const registerUser = async (credentials) => {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);

    let { username, email } = credentials;
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
      // console.log(msg);
      return Promise.resolve(msg);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject({ error: "Incorrect password" });
  }
};

export const updateUser = async (body) => {
  // console.log(body)

  try {
    const token = localStorage.getItem("token");

    const data = await axios.put("/api/updateUser", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Cant update profile" });
  }
};

export const genrateOtp = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/genrateotp", { params: { username: username } });

    if (status === 201) {
      let {
        data: { email },
      } = await getUser(username);

      let text = `Your Otp is ${code}`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "password recovery",
      });

      return Promise.resolve(code);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const verifyOtp = async ({ username, code }) => {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve(data, status);
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const getUserFriends = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const { data, status } = await axios.get(`api/${id}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data, status };
  } catch (error) {
    return { error: "cant get friends" };
  }
};

export const uploadPosts = async (details) => {
  try {
    const { data, status } = await axios.post("/api/uploadpost", details);
    if (status === 201) {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};
export const getFeedPosts = async () => {
  const token = localStorage.getItem("token");
  const { data, status } = await axios.get("/api/explore", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (status === 200) {
    // console.log(data);
    return data;
  }
};

export const addComment = async (values) => {
  try {
    const { status } = await axios.patch("/api/comment", values);
    if (status === 201) {
      Promise.resolve();
    }
  } catch (error) {
    Promise.reject(error);
  }
};

export const UpdateLikes = async (value) => {
  const { postId, userId } = value;
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(
      `/api/like`,
      { userId, id: postId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    Promise.reject(error.message);
  }
};

export const addFriends = async (value) => {
  try {
    const { id, friendId } = value;
    const token = localStorage.getItem("token");
    const { data, status } = await axios.patch(
      `/api/addFriends`,
      { id, friendId },
      { headers: { Authorization: `Brearer ${token}` } }
    );
    if (status === 200) {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletepost = async (id) => {
  try {
    const { data } = await axios.post("/api/delpost", { id });
    Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data, status } = await axios.get("/api/users");
    if (status === 200) {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const LoadServer=async()=>{
  try {
    const {data,status}=await axios.get('/api/load');
    if(status===200){
      return Promise.resolve(data)
    }
  } catch (error) {
    return Promise.reject("cannot load server")
  }
}


export const  postReport=async(values)=>{
  const {reportedById,userId,postId,reportContent}=values
  try {
    const {data,status}=await axios.post('/api/reportpost',{reportedById,userId,postId,reportContent})
    

    


    if(status===201){
      Promise.resolve(data)
    }else{
      Promise.reject("data not correct")
    }
  } catch (error) {
    return Promise.reject("server error")
  }
}