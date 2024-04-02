import "./SideNav.css";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { MdContactMail } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";

function SideNav() {
  const [hideSideNav, setHideSideNav] = useState(true);
  return (
    <>
      <div className={`side-nav-button-wrapper ${hideSideNav ? "" : "show"}`}>
        <button
          className={`side-nav-button ${hideSideNav ? "" : "show"}`}
          onClick={() => setHideSideNav(!hideSideNav)}
        >
          <FaArrowUp
            className={`side-nav-icon ${hideSideNav ? "" : "show"}`}
            fontSize="large"
          />
        </button>
      </div>
      <div className={`side-nav ${hideSideNav ? "hide" : "show"}`}>
        <ul>
          <a href="/home">
            <li className="about-home">
              <FaHome fontSize="large" />
            </li>
          </a>
          <a href="#about-us">
            <li className="about-info">
              <FaInfoCircle fontSize="large" />
            </li>
          </a>
          <a href="#services">
            <li className="about-services">
              <MdOutlineDesignServices fontSize="large" />
            </li>
          </a>
          <a href="#team">
            <li className="about-team">
              <TiGroup fontSize="large" />
            </li>
          </a>
          <a href="#contact">
            <li className="about-contact">
              <MdContactMail fontSize="large" />
            </li>
          </a>
        </ul>
      </div>
    </>
  );
}

export default SideNav;
