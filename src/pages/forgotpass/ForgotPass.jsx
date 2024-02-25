import "./ForgotPass.css";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function ForgotPass() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const emailRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    toast
      .promise(
        sendPasswordResetEmail(auth, emailRef.current.value).then(() => {
          setLoading(false);
          toast.info("Check your inbox for further instructions.");
          navigate("/login", {state: {email: email}});
        }),
        {
          pending: "Loading...",
          success: "Password Reset email sent!",
          error: "An error occurred",
        }
      )
      .catch(() => {
        setError("User does not exist!");
        setLoading(false);
      });
  };

  return (
    <div className="forgotpass">
      <motion.form
        initial={{ opacity: 0, y: "5rem" }}
        exit={{ opacity: 0, y: "5rem" }}
        animate={{ opacity: 1, y: 0 }}
        layout
        onSubmit={handleSubmit}
      >
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-div">
          <label>Email Address</label>
          <input
            type="email"
            required
            defaultValue={email ? email : undefined}
            ref={emailRef}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
        </div>
        <button disabled={loading}>
          {loading ? "Sending Mail..." : "Reset Password"}
        </button>
        <p>
          <Link to="/login" state={{ email: email }}>
            Back to Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
export default ForgotPass;
