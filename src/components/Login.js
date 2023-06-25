import React from "react";

function Login() {
  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" name="form-register" noValidate>
          <input
            className="auth__input auth__input-email"
            type="email"
            name="email"
            minLength={8}
            maxLength={40}
            placeholder="Email"
            id="input-email"
          ></input>
          <span className="auth__input-error" />
          <input
            className="auth__input auth__input-password"
            type="text"
            name="password"
            minLength={6}
            maxLength={20}
            placeholder="Пароль"
            id="input-password"
          ></input>
          <span className="auth__input-error" />
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
