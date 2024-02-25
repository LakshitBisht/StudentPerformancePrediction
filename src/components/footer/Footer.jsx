import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebook,FaTwitter,FaInstagram,FaLinkedin } from "react-icons/fa";

function Footer() {
  const handleClick = (id) => {
    setTimeout(() => {
      const section = document.querySelector(id);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  return (
    <div className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <ul className="social_icon">
        <li>
          <a href="https://www.facebook.com/">
            <FaFacebook/>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/">
            <FaTwitter/>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com">
            <FaLinkedin/>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/">
            <FaInstagram/>
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li onClick={() => handleClick("#about-header")}>
          <Link to="/about">About</Link>
        </li>
        <li onClick={() => handleClick("#services")}>
          <Link to="/about">Services</Link>
        </li>
        <li onClick={() => handleClick("#team")}>
          <Link to="/about">Team</Link>
        </li>
        <li onClick={() => handleClick("#contact")}>
          <Link to="/about">Contact</Link>
        </li>
      </ul>
      <p>{"©" + new Date().getFullYear() + " Student Performance Prediction | All Rights Reserved"}</p>
    </div>
  );
}

export default Footer;
