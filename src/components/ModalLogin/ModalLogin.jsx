import React, { useState } from "react";
import "./ModalLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ModalLogin = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipEmail, setTooltipEmail] = useState("");
  const [tooltipPassword, setTooltipPassword] = useState("");

  const handleFocus = (inputType) => {
    if (inputType === "email") {
      setTooltipEmail("Preencha seu email");
    } else if (inputType === "password") {
      setTooltipPassword("Preencha sua senha");
    }
  };

  const handleBlur = (inputType) => {
    if (inputType === "email") {
      setTooltipEmail("");
    } else if (inputType === "password") {
      setTooltipPassword("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(email, password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
            />
            {tooltipEmail && <div className="tooltip">{tooltipEmail}</div>}
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {tooltipPassword && <div className="tooltip">{tooltipPassword}</div>}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Entrar
            </button>
            <button type="button" className="close-modal-button" onClick={onClose}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
