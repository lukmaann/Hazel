import axios from "axios";
import { usePostStore } from "../store/store";

axios.defaults.baseURL = "https://hazelsocialappbackend.onrender.com/"||"http://localhost:3000/";

import { useEffect, useState } from "react";

const useFecth = () => {
  const setPosts=usePostStore((state)=>state.setPosts)
  const [getData, setData] = useState({
    postData: null,
    postserverError: null,
    postisLoading: false,
  });

  useEffect(() => {
    const fecth = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axios.get("/api/explore");
        if (status === 200) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setPosts(data)
          setData((prev) => ({ ...prev, postData: data }));
        }
        setData((prev) => ({ ...prev, postisLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, serverError: error.message }));
      }
    };
    fecth();
  }, []);

  return [getData, setData];
};

export default useFecth;
