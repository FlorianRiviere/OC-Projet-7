import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Group from "../../pages/Group";
import { UidContext } from "../AppContext";
import { useSelector } from "react-redux";

function Index() {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);

  if (userData !== null) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil/:id" element={<Profil />} />
            <Route
              path="/profil"
              element={<Navigate to={`/profil/${uid}`} replace />}
            />
            <Route path="/group" element={<Group />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default Index;
