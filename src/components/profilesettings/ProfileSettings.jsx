import { useState, useEffect, useRef } from "react";
import "./ProfileSetting.css";
import { auth } from "../../firebase/firebase";
import {
  updateEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateUserDB, deleteUserDB, login } from "../../features/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loading from "../../components/loading/Loading";

function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validatePassword, setValidatePassword] = useState(false);
  const [updatePro, setUpdatePro] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setTimeout(() => {}, 10000);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    setLoading(true);

    let oldEmail = auth.currentUser.email;
    toast
      .promise(
        updateEmail(auth.currentUser, emailRef.current.value).then(async () => {
          dispatch(updateUserDB({email: oldEmail, newEmail:emailRef.current.value}));
          await updateProfile(auth.currentUser, {
            displayName: usernameRef.current.value,
            photoURL: `https://api.dicebear.com/7.x/adventurer-neutral/svg/seed=${emailRef.current.value}`,
          });
          if (newPasswordRef.current.value !== "") {
            updatePassword(auth.currentUser, newPasswordRef.current.value);
          }
          setLoading(false);
          setUpdatePro(false);
          dispatch(login({
            uid: auth.currentUser.uid,
            email: emailRef.current.value,
            displayName: usernameRef.current.value,
            photoURL: auth.currentUser.photoURL
          }));
        }),
        {
          pending: "Updating Profile...",
          success: "Profile Updated!",
          error: "An error occurred",
        }
      )
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const validateCredentialsUpdate = (e) => {
    e.preventDefault();
    setValidatePassword(true);
    setCheckUpdate(true);
  };
  const validateCredentialsDelete = (e) => {
    e.preventDefault();
    setValidatePassword(true);
    setCheckDelete(true);
  };

  const enableUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const credential = EmailAuthProvider.credential(
      emailRef.current.value,
      passwordRef.current.value
    );
    toast
      .promise(
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
          setUpdatePro(true);
          setLoading(false);
          setValidatePassword(false);
        }),
        {
          pending: "Validating Password...",
          success: "Password Validated!",
          error: "Incorrect Password",
        }
      )
      .catch(() => {
        setLoading(false);
        setValidatePassword(false);
        setCheckUpdate(false);
        document.getElementById("profileForm").reset();
      });
  };

  const cancelProfileChange = (e) => {
    e.preventDefault();
    setUpdatePro(false);
    setCheckUpdate(false);
    setCheckDelete(false);
    setValidatePassword(false);
    document.getElementById("profileForm").reset();
  };

  const deleteProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    const credential = EmailAuthProvider.credential(
      emailRef.current.value,
      passwordRef.current.value
    );
    toast
      .promise(
        reauthenticateWithCredential(auth.currentUser, credential).then(() => {
          dispatch(deleteUserDB(auth.currentUser.email));
          setTimeout(() => {
            deleteUser(auth.currentUser);
            setLoading(false);
          }, 1000);
        }),
        {
          pending: "Deleting Profile...",
          success: "Profile Deleted!",
          error: "Incorrect Password",
        }
      )
      .catch(() => {
        setLoading(false);
        setValidatePassword(false);
        setCheckDelete(false);
      });
  };

  return (
    <>
    {loading && <Loading/>}
      <div className="profile">
        <motion.form
          id="profileForm"
          initial={{ opacity: 0, y: "5rem" }}
          exit={{ opacity: 0, y: "5rem" }}
          animate={{ opacity: 1, y: 0 }}
          layout
          onSubmit={
            updatePro
              ? handleSubmit
              : !validatePassword
              ? validateCredentialsUpdate
              : enableUpdate
          }
        >
          <h2>{updatePro ? "Update Profile" : "Profile Settings"}</h2>
          {error && <p className="error">{error}</p>}
          <div className="input-div">
            <label>Username</label>
            <input
              type="text"
              defaultValue={auth.currentUser.displayName}
              required
              ref={usernameRef}
              disabled={!updatePro}
              autoComplete="on"
            />
          </div>
          <div className="input-div">
            <label>Email Address</label>
            <input
              type="email"
              required
              ref={emailRef}
              defaultValue={auth.currentUser.email}
              disabled={!updatePro}
                autoComplete="on"
            />
          </div>
          {validatePassword && (
            <div className="input-div">
              <label>Password</label>
              <input
                type="password"
                required
                ref={passwordRef}
                placeholder="Enter Password to Continue."
                autoComplete="new-password"
              />
            </div>
          )}
          {updatePro && (
            <div className="input-div">
              <label>New Password</label>
              <input
                type="password"
                ref={newPasswordRef}
                placeholder="Leave Blank to keep the Same."
                autoComplete="new-password"
              />
            </div>
          )}
          {updatePro && (
            <div className="input-div">
              <label>Confirm New Password</label>
              <input
                type="password"
                ref={confirmNewPasswordRef}
                placeholder="Leave Blank to keep the Same."
                autoComplete="new-password"
              />
            </div>
          )}
          {!checkDelete && (
            <button disabled={loading}>
              {updatePro
                ? "Confirm"
                : !validatePassword
                ? "Update Profile"
                : "Continue"}
            </button>
          )}
          {!checkUpdate && (
            <button
              disabled={loading}
              onClick={
                !validatePassword ? validateCredentialsDelete : deleteProfile
              }
            >
              {!validatePassword ? "Delete Profile" : "Continue"}
            </button>
          )}
          {(updatePro || checkDelete) && (
            <button disabled={loading} onClick={cancelProfileChange}>
              Cancel
            </button>
          )}
        </motion.form>
      </div>
    </>
  );
}
export default ProfileSettings;
