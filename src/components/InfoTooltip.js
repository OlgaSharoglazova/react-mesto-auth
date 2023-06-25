import React from "react";
import success from "../images/success.svg";

function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className="popup popup-info popup_opened">
      <div className="popup__container popup__container-info">
        <img src={success} className="popup__icon" alt="галочка" />
        <p className="popup__text">Вы успешно зарегистрировались!</p>
        <button
          className="popup__close popup-info__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
