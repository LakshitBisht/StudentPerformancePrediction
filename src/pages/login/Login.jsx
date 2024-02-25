import "./Login.css";
import { auth, provider } from "../../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
    return () => {
      setEmail("");
    };
  }, [location]);

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
      .then(() => {
        setLoading(false);
        toast.success("Welcome Back!");
        navigate("/browse/home", { replace: true });
      })
      .catch(() => {
        setError("Login with Google Failed!");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    toast
      .promise(
        signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        ).then(() => {
          setLoading(false);
          navigate("/browse/home", { replace: true });
        }),
        {
          pending: "Logging In...",
          success: "Welcome Back!",
          error: "An error occurred",
        }
      )
      .catch(() => {
        setError("Login Failed!");
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <motion.form
        initial={{ opacity: 0, y: "5rem" }}
        exit={{ opacity: 0, y: "5rem" }}
        animate={{ opacity: 1, y: 0 }}
        layout
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-div">
          <label>Email Address</label>
          <input
            type="email"
            required
            ref={emailRef}
            defaultValue={email}
            placeholder="Enter Your Email"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Password</label>
          <input
            type="password"
            required
            ref={passwordRef}
            placeholder="••••••••"
            autoComplete="on"
          />
        </div>
        <p className="forgotPassword">
          <Link to="/forgot-password" state={{ email: email }}>
            Forgot Password?
          </Link>
        </p>
        <button disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        <button className="google" disabled={loading} onClick={googleSignIn}>
          Sign In with Google
        </button>
        <p>{"Create New Account? "}<Link to="/signup" replace>Sign Up Now.</Link></p>
      </motion.form>
    </div>
  );
}
export default Login;
