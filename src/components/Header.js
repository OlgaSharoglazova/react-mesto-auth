import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__navigation">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
        <Link to="/sign-in" className="header__link">Войти</Link>
        <Link to="/sign-in" className="header__link">Выйти</Link>
        <p className="header__email">email@mail.com</p>
      </div>
    </header>
  );
}

export default Header;
