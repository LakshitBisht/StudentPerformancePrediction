import "./App.css";
import Loading from "./components/loading/Loading";
import Login from "./pages/login/Login";
import Signup from "./pages/singnup/Signup";
import ForgotPass from "./pages/forgotpass/ForgotPass";
import HomeScreen from "./pages/homescreen/HomeScreen";
import About from "./pages/about/About";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser, getUserDataDB } from "./features/userSlice";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import BackToTop from "./components/backtotop/BackToTop";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const currUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        dispatch(getUserDataDB(user.email));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const checkScroll = () => {
    if (window.scrollY > 2000) {
      setShowBackToTop(true);
    } else {
      setTimeout(() => {
        setShowBackToTop(false);
      }, 800);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="app">
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <BackToTop disable={!showBackToTop} />
            <Routes>
              <Route exact path="/about" element={<About />} />
              {!currUser ? (
                <>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<Signup />} />
                  <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPass />}
                  />
                </>
              ) : (
                <>
                  <Route exact path="/home" element={<HomeScreen />} />
                </>
              )}
              ;
              <Route
                path="*"
                element={
                  <Navigate to={currUser ? "/home" : "/login"} replace />
                }
              />
            </Routes>
          </Router>
        )}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </AnimatePresence>
  );
}

export default App;
