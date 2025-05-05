import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import Form from "../components/Form/Form";
import { toast } from "react-toastify";

import {
  setEmail,
  setPassword,
  setClearInputBox,
  signInThunk,
  setErrorEmpty,
} from "../store/reducers/user.reducer";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  //Initialize navigation
  const navigate = useNavigate();

  // Accessing the context to manage the user's ID
  const { userId, setUserId } = useContext(UserContext);
  const dispatch = useDispatch();
  const { email, password, success, error } = useSelector(
    (store) => store.user
  );

  // Handle changes in the email input field
  const handleSignEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  // Handle changes in the password input field
  const handleSignPassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  // Handle the signin process with Firebase authentication
  const handleSignin = async (e) => {
    try {
      //Prevent default form submission
      e.preventDefault();

      // Check if both email and password are entered
      if (!email || !password) {
        toast.error("Please enter valid data!");
        return;
      }

      // Attempt to sign in with Firebase auth
      const userCredentials = await dispatch(signInThunk({ email, password }));
      if (userCredentials.meta.requestStatus == "rejected") {
        return;
      }
      const uId = userCredentials.payload.user.uid; // Extract user ID from the returned credentials
      localStorage.setItem("userId", uId);
      setUserId(uId);
      dispatch(setClearInputBox());
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(setErrorEmpty());
    }
    if (error) {
      toast.error(error);
      dispatch(setErrorEmpty());
    }
  }, [error, success]);

  return (
    <>
      <div className="signin-container">
        <h1>Sign In</h1>
        {/* Form component to handle email, password inputs and submit */}
        <Form
          handleSignEmail={handleSignEmail}
          handleSignPassword={handleSignPassword}
          handleSignin={handleSignin}
        />
        {/* Provide a link to the signup page */}
        <p onClick={() => navigate("/signup")}>Or SignUp instead</p>
      </div>
    </>
  );
};

export default Signin;
