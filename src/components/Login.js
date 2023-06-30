import React from "react";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin, setUserEmail }) {
  const [formValue, setFormValue] = React.useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth
      .login(formValue.email, formValue.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token)
        handleLogin();
        navigate("/");
        setUserEmail(formValue.email);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form
          className="auth__form"
          name="form-register"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className="auth__input auth__input-email"
            type="email"
            name="email"
            minLength={8}
            maxLength={40}
            placeholder="Email"
            id="input-email"
            value={formValue.email}
            onChange={handleChange}
            autoComplete="email"
          ></input>
          <span className="auth__input-error" />
          <input
            className="auth__input auth__input-password"
            type="password"
            name="password"
            minLength={6}
            maxLength={20}
            placeholder="Пароль"
            id="input-password"
            value={formValue.password}
            onChange={handleChange}
            autoComplete="current-password"
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
