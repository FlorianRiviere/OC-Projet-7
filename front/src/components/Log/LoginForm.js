import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersData = useSelector((state) => state.users.users);
  const userEmail = usersData.map((user) => user.email);

  const emailError = document.querySelector("#email-error");
  const passwordError = document.querySelector("#password-error");

  const handleLogin = (e) => {
    e.preventDefault();

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

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
        document.cookie = "token=" + res.data.token;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        formError();
      });
  };

  const formError = () => {
    if (email === "" || password === "") {
      emailError.innerHTML = "Veuillez renseigner les champs";
    } else if (!userEmail.includes(email)) {
      emailError.innerHTML = "Adresse email introuvable";
    } else {
      passwordError.innerHTML = "Mauvais mot de passe";
    }
  };

  return (
    <div className="logForm">
      <h1>Connexion</h1>
      <form action="" onSubmit={handleLogin} id="log-in-form">
        <div id="email-error" className="error"></div>
        <div className="input-bloc">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <br />
        <div className="input-bloc">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div id="password-error" className="error"></div>
        <br />
        <div className="log-btn-bloc">
          <input className="log-btn" type="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
