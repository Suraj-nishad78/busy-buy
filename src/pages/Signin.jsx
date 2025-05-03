import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from "../context";
import Form from "../components/Form/Form";
import { auth } from "../../config/firebaseinit";
import { toast } from "react-toastify";

import {
  setEmail,
  setPassword,
  setClearInputBox,
} from "../store/reducers/user.reducer";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const navigate = useNavigate(); //Initialize navigation
  const [signText, setSignText] = useState({
    email: "",
    password: "",
  });

  // Accessing the context to manage the user's ID
  const { userId, setUserId } = useContext(UserContext);
  const dispatch = useDispatch()
  const {email, password} = useSelector((store)=>store.user)

  // Handle changes in the email input field
  const handleSignEmail = (e) => {
    // setSignText({
    //   ...signText,
    //   email: e.target.value,
    // });
    dispatch(setEmail(e.target.value));
  };

  // Handle changes in the password input field
  const handleSignPassword = (e) => {
    // setSignText({
    //   ...signText,
    //   password: e.target.value,
    // });
    dispatch(setPassword(e.target.value));
  };

  // Clear the input fields after a successful login
  // const clearInputBox = () => {
  //   setSignText({
  //     email: "",
  //     password: "",
  //   });
  // };

  // Handle the signin process with Firebase authentication
  const handleSignin = async (e) => {
    try {
      e.preventDefault(); //Prevent default form submission
      // const { email, password } = signText;

      // Check if both email and password are entered
      if (!email || !password) {
        toast.error("Please fill the required field!: 'Email' & 'Password'");
        return;
      }

      // Attempt to sign in with Firebase auth
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uId = userCredentials.user.uid; // Extract user ID from the returned credentials

      localStorage.setItem("userId", uId);
      setUserId(uId);
      dispatch(setClearInputBox())
      toast.success("You have succeefully logged in!");
      navigate("/");
    } catch (error) {
      // Handle different error cases from Firebase authentication
      console.log(error);
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address."); // Invalid email format
          break;
        case "auth/invalid-credential":
          toast.error("Incorrect email or password."); // Incorrect password entered
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email."); // No user registered with this email
          break;
        default:
          toast.error("Login failed: " + error.message); // General error message
      }
    }
  };

  return (
    <>
      <div className="signin-container">
        <h1>Sign In</h1>
        {/* Form component to handle email, password inputs and submit */}
        <Form
          signText={signText}
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
