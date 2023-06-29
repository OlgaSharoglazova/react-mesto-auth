import React from "react";
import { Link } from "react-router-dom";

function Header({ userData }) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__navigation">
        <p className="header__email">{userData.data?.email}</p>
        <Link to="/signin" className="header__link">Выйти</Link>
      </div>
    </header>
  );
}

export default Header;
