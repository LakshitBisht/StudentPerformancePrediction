/* eslint-disable react/prop-types */
import "./Sidebar.css";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { SiHomebridge } from "react-icons/si";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { LuListEnd } from "react-icons/lu";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";

function Sidebar({ user, setActiveTab }) {
  const [tabStatus, settabStatus] = useState({
    home: true,
    pred: false,
    recommend: false,
    settings: false,
  });
  return (
    <div className="sidebar">
      <div>
        <div className="user-info">
          <img src={user.photoURL} alt="profile.img" className="profile-img" />
          <h1 className="user-name">{user.displayName}</h1>
          <h2 className="user-email">{user.email}</h2>
        </div>
        <ul className="tabs">
          <h1>Dashboard</h1>
          <li
            className={`tab-button ${tabStatus.home && "active"}`}
            onClick={() => {
              setActiveTab("home");
              settabStatus({
                home: true,
                pred: false,
                recommend: false,
                settings: false,
              });
            }}
          >
            <SiHomebridge /> Home
          </li>
          <li
            className={`tab-button ${tabStatus.pred && "active"}`}
            onClick={() => {
              setActiveTab("pred");
              settabStatus({
                home: false,
                pred: true,
                recommend: false,
                settings: false,
              });
            }}
          >
            <MdOutlineHistoryEdu /> Predictions
          </li>
          <li
            className={`tab-button ${tabStatus.recommend && "active"}`}
            onClick={() => {
              setActiveTab("recommend");
              settabStatus({
                settings: false,
                home: false,
                pred: false,
                recommend: true,
              });
            }}
          >
            <LuListEnd /> Recommendations
          </li>
        </ul>
      </div>
      <ul className="settings">
        <div className="line"></div>
        <li
          className="settings-button"
          onClick={() => {
            setActiveTab("settings");
            settabStatus({
              settings: true,
              home: false,
              pred: false,
              recommend: false,
            });
          }}
        >
          <IoSettingsSharp /> Settings
        </li>
        <li
          className="settings-button"
          onClick={() => {
            signOut(auth);
            toast.success("We'll be waiting for your return!");
          }}
        >
          <FiLogOut /> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
