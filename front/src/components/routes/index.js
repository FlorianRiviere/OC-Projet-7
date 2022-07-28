import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Group from "../../pages/Group";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/group" exact component={Group} />
          <Navigate to="/" />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
