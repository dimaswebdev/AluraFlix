import React from "react";
import PropTypes from "prop-types";
import "./SocialMedia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const socialMediaLinks = [
  { href: "https://github.com/dimaswebdev", icon: faGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/dimas-dimasdesigner/", icon: faLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/dimas_bm193/", icon: faInstagram, label: "Instagram" },
  { href: `${process.env.PUBLIC_URL}/curriculo-dimas.pdf`, icon: faFileAlt, label: "Currículo" },
];

const SocialMediaLink = ({ href, icon, label }) => (
  <li className="redes__elemento">
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <FontAwesomeIcon icon={icon} className="redes__icone" />
    </a>
  </li>
);

SocialMediaLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

function SocialMedia() {
  return (
    <ul className="redes">
      {socialMediaLinks.map((link, index) => (
        <SocialMediaLink
          key={index}
          href={link.href}
          icon={link.icon}
          label={link.label}
        />
      ))}
    </ul>
  );
}

export default SocialMedia;