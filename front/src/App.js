import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if (uid == null) {
      const fetchToken = async () => {
        axios({
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
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
