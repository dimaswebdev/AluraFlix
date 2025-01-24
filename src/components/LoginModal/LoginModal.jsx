import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./LoginModal.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tooltip, setTooltip] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      onClose();
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleFocus = (inputType) => {
    if (inputType === "email") {
      setTooltip("Digite o email aluraflix@one.com");
    } else if (inputType === "password") {
      setTooltip("Digite a senha DimasAluraOne2024!");
    }
  };

  const handleBlur = () => {
    setTooltip("");
  };

  return (
    <div className="popup-overlay">
      {/* Cabeçalho posicionado acima do modal */}
      <div className="welcome-header">
        <h1>Bem-vindo ao AluraFlix</h1>
        <h2>Seu novo portal de conhecimento!</h2>
      </div>
      <div>
      <img src="/dimas-logo.png" alt="AluraFlix Logo" className="logoModal" />
      </div>

      {/* Modal de Login */}
      <div className="popup-content">
        
        <h2>Login</h2>
        {tooltip && <div className="tooltip">{tooltip}</div>}
        <form>
          <div className="input-container">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <div className="popup-buttons">
            <button type="button" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;