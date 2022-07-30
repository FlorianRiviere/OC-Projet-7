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

function index() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/group" element={<Group />} />
          <Route path="/" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default index;
