/* eslint-disable react/prop-types */
import "./BackToTop.css";
import { FaArrowUp } from "react-icons/fa";

function BackToTop({ disable = false }) {
  return (
    <div className="back-to-top">
      <button
        className="back-to-top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        disabled={disable}
      >
        <FaArrowUp className="back-to-top-icon" fontSize="large" />
      </button>
    </div>
  );
}

export default BackToTop;
