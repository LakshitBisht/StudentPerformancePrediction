import {useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import LogoImg from "../../assets/images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [hamburgerActive, setHamburgerActive] = useState(false);


  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };



  return (
    <>
      <div className={`navbar`}>
        <div
          className={`hamburger-overlay ${
            hamburgerActive ? "overlay-slide-left" : "overlay-slide-right"
          }`}
        >
          <ul>
            <li>
              <NavLink to="/browse/home" data-after={"Home"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/mylist" data-after={"Favourites"}>
                Favourites
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-items">
          <ul className="nav-left">
            <div
              className={`hamburger-lines ${hamburgerActive ? "active" : ""}`}
              onClick={() => setHamburgerActive(!hamburgerActive)}
            >
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <li>
              <NavLink to="/browse/home" className="logo-link">
                <img className="logo" src={LogoImg} alt="logo.png" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse/home">Home</NavLink>
            </li>
            
            <li>
              <NavLink to="/mylist">Favourites</NavLink>
            </li>
          </ul>

          <ul className="nav-right">
            
            {user?.photoURL && (
              <>
                <div className="nav-profile">
                  <img
                    className="avatar"
                    src={user.photoURL}
                    alt="avatar.png"
                  />
                  <ul className="options">
                    <li onClick={handleProfile}>Profile</li>
                    <li
                      onClick={() => {
                        signOut(auth);
                        toast.success("We'll be waiting for your return!");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
