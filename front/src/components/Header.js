import React from "react";
import Logo from "../assets/logos/icon-left-font-crop.png";

function Header() {
  return (
    <div>
      <header>
        <img src={Logo} alt="Icone de l'entreprise"></img>
      </header>
    </div>
  );
}

export default Header;
