import React, { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const options = [
    {
      label: "Sélectionnez votre service",
    },
    {
      label: "Achat",
      value: "achat",
    },
    {
      label: "Après-vente",
      value: "après-vente",
    },
    {
      label: "Juridique",
      value: "juridique",
    },
    {
      label: "Comptabilité",
      value: "comptabilité",
    },
    {
      label: "Informatique",
      value: "informatique",
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(
      ".confirm-password.error"
    );

    if (password !== confirmPassword) {
      confirmPasswordError.innerHTML =
        "Les mots de passe ne sont pas identiques";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/signup`,
        data: {
          lastName,
          firstName,
          department,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          }
          alert("Enregistrement terminé, vous pouvez vous connecter");
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="logForm">
      <h1>Inscription</h1>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <div className="input-bloc">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <br />
        <div className="input-bloc">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <br />
        <div className="input-bloc">
          <label htmlFor="department">Service :</label>
          <select
            name="department"
            id="department"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
          >
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <br />
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
        <div className="email error"></div>
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
        <div className="password error"></div>
        <br />
        <div className="input-bloc">
          <label htmlFor="conf-password">Confirmer mot de passe :</label>
          <input
            type="password"
            name="password"
            id="conf-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <div className="confirm-password error"></div>
        <br />
        <div className="log-btn-bloc">
          <input className="log-btn" type="submit" value="S'inscrire" />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
