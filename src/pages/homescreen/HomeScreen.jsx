// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Loading from "../../components/loading/Loading";
import "./HomeScreen.css";
import ProfileSettings from "../../components/profilesettings/ProfileSettings";
import { useState } from "react";
import Predictions from "../predictions/Predictions";
import Recommendations from "../recommendations/Recommendations";
import PredictionForm from "../predictionform/PredictionForm";

export default function HomeScreen() {
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="homeScreen">
      {!user.displayName ? (
        <Loading />
      ) : (
        <>
          {/* <Navbar /> */}
          <div className="title">
            <h1>Education Performance Prediction</h1>
          </div>
          <Sidebar user={user} setActiveTab={setActiveTab} />
          <div className="dashboard-content">
            {activeTab == "home" && <PredictionForm user={user} />}
            {activeTab == "pred" && <Predictions user={user} />}
            {activeTab == "recommend" && <Recommendations user={user} />}
            {activeTab == "settings" && <ProfileSettings />}
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
