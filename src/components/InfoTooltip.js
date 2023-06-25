import React from "react";

function InfoTooltip() {
  return (
    <div className={`popup popup-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container container">
        <img />
        <p></p>
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
