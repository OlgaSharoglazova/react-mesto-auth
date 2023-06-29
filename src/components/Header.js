import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ userData }) {

const navigate = useNavigate();
function signOut() {
  localStorage.removeItem("jwt");
  navigate("/signin");
}
  
  return (
    <header className="header">
      <div className="header__logo" />
      <ul className="header__navigation">
        <li><p className="header__email">{userData.data?.email}</p></li>
        <li><button onClick={signOut} className="header__button">Выйти</button></li>
        <li></li>
        <li></li>   
      </ul>
    </header>
  );
}

export default Header;
