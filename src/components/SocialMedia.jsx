import React from "react";
import "../styles/SocialMedia.css"; // Importe o CSS criado
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function SocialMedia() {
  return (
    <ul className="redes">
      <li className="redes__elemento">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="redes__icone" />
        </a>
      </li>
      <li className="redes__elemento">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} className="redes__icone" />
        </a>
      </li>
      <li className="redes__elemento">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="redes__icone" />
        </a>
      </li>
      <li className="redes__elemento">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="redes__icone" />
        </a>
      </li>
    </ul>
  );
}

export default SocialMedia;
