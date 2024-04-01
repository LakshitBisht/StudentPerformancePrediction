import "./Signup.css";
import { auth, provider } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, createUserDB } from "../../features/userSlice";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const googleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(createUserDB(result.user.email));
        setLoading(false);
        toast.success("Welcome!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch(() => {
        setError("Signing In with Google Failed!");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value.length < 6) {
      return setError("Passwords Should be of Atleast 6 Characters!");
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords Do Not Match!");
    }
    setLoading(true);
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let username = usernameRef.current.value;
    toast
      .promise(
        createUserWithEmailAndPassword(auth, email, password).then(async () => {
          dispatch(createUserDB(email));
          await updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: `https://api.dicebear.com/7.x/adventurer-neutral/svg/seed=${email}`,
          });
          dispatch(
            login({
              uid: auth.currentUser.uid,
              email: auth.currentUser.email,
              displayName: auth.currentUser.displayName,
              photoURL: auth.currentUser.photoURL,
            })
          );
          setLoading(false);
          navigate("/home", { replace: true });
        }),
        {
          pending: "Setting Up Account...",
          success: "Account Created Successfully!",
          error: "An error occurred",
        }
      )
      .catch(() => {
        setError("Sign Up Failed!");
        setLoading(false);
      });
  };

  return (
    <div className="signup">
      <motion.form
        initial={{ opacity: 0, y: "5rem" }}
        exit={{ opacity: 0, y: "5rem" }}
        animate={{ opacity: 1, y: 0 }}
        layout
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-div">
          <label>Username</label>
          <input
            type="text"
            required
            ref={usernameRef}
            placeholder="Enter Your Name"
            autoComplete="on"
          />
        </div>
        <div className="input-div">
          <label>Email Address</label>
          <input
            type="email"
            required
            ref={emailRef}
            placeholder="Enter Your Email"
            autoComplete="on"
          />
        </div>
        <div className="input-div">
          <label>Password</label>
          <input
            type="password"
            required
            ref={passwordRef}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <div className="input-div">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            ref={confirmPasswordRef}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
        <button disabled={loading}>
          {loading ? "Signing up..." : "Create Account"}
        </button>
        <button className="google" disabled={loading} onClick={googleSignIn}>
          Sign In with Google
        </button>
        <p>
          {"Already have an account? "}
          <Link to="/login">Login Instead.</Link>
        </p>
      </motion.form>
    </div>
  );
}
export default Signup;
