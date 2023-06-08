import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
import { useEffect, useState } from "react";
import { getUserFriends, getUsername } from "../helper/helper";

const useFecth = (query) => {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: null,
    serverError: null,
    status: null,
  });

  useEffect(() => {
    const fecth = async () => {
      try {
        const { username } = !query ? await getUsername() : "";

        setData((prev) => ({ ...prev, isLoading: true }));
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`api/${query}`);
        if (status === 200) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data }));
        }
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fecth();
  }, [query]);

  return [getData, setData];
};

export default useFecth;
