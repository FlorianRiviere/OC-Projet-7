import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        window.location = "/";
        document.cookie = "token=" + res.data.token;
      })
      .catch((err) => {
        emailError.innerHTML("err.res.data.errors.email");
        passwordError.innerHTML("err.res.data.errors.pasword");
        console.log(err);
      });
  };

  return (
    <div className="logForm">
      <h1>Connexion</h1>
      <form action="" onSubmit={handleLogin} id="log-in-form">
        <div className="input-bloc">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="email error"></div>
        <br />
        <div className="input-bloc">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="password error"></div>
        <br />
        <div className="btn-bloc">
          <input className="btn" type="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
