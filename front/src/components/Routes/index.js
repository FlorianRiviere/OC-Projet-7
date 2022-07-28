import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";

function index() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profil" exact element={<Profil />} />
          <Route path="/" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default index;
