import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "./feature/userSlice";
import { getUsersData } from "./feature/usersSlice";
import { getPostsData } from "./feature/postsSlice";
import { getCommentsData } from "./feature/commentsSlice";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid == null) {
      const fetchToken = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}jwtid`,
          withCredentials: true,
        })
          .then((res) => {
            setUid(res.data._id);
            console.log(res.data._id);
          })
          .catch((err) => console.log("No token", err));
      };
      fetchToken();
    }
    if (uid) {
      const getUser = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getUserData(res.data));
          })
          .catch((err) => console.log(err));
      };
      const getUsers = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/users`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getUsersData(res.data));
          })
          .catch((err) => console.log(err));
      };
      const getPosts = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/posts`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getPostsData(res.data));
          })
          .catch((err) => console.log(err));
      };
      const getComments = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/comments`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getCommentsData(res.data));
          })
          .catch((err) => console.log(err));
      };
      getUser();
      getUsers();
      getPosts();
      getComments();
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
