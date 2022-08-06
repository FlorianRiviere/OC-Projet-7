import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Log() {
  const [LoginModal, setLoginModal] = useState(true);
  const [SignupModal, setSignupModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "login") {
      setLoginModal(true);
      setSignupModal(false);
    } else if (e.target.id === "signup") {
      setLoginModal(false);
      setSignupModal(true);
    }
  };

  return (
    <>
      <ul>
        <li
          onClick={handleModals}
          id="login"
          className={LoginModal ? "active-btn" : null}
        >
          Se connecter
        </li>
        <li
          onClick={handleModals}
          id="signup"
          className={SignupModal ? "active-btn" : null}
        >
          S'inscrire
        </li>
      </ul>
      {LoginModal && <LoginForm />}
      {SignupModal && <SignupForm />}
    </>
  );
}

export default Log;
