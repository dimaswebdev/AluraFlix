import React from "react";
import PropTypes from "prop-types";
import "./SocialMedia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const socialMediaLinks = [
  { href: "https://facebook.com", icon: faFacebook, label: "Facebook" },
  { href: "https://twitter.com", icon: faTwitter, label: "Twitter" },
  { href: "https://instagram.com", icon: faInstagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: faLinkedin, label: "LinkedIn" },
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