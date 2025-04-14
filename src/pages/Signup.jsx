import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Form from "../components/Form/Form";
import { auth } from "../../config/firebaseinit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupText, setSignUpText] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // To navigate programmatically after successful signup

  // Handling name input change
  const handleSignupName = (e) => {
    setSignUpText({
      ...signupText,
      name: e.target.value,
    });
  };

  // Handling email input change
  const handleSignupEmail = (e) => {
    setSignUpText({
      ...signupText,
      email: e.target.value,
    });
  };

  // Handling password input change
  const handleSignupPassword = (e) => {
    setSignUpText({
      ...signupText,
      password: e.target.value,
    });
  };

  // Clear input fields after successful signup
  const clearInputBox = () => {
    setSignUpText({
      name: "",
      email: "",
      password: "",
    });
  };

  // Handle the signup process
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = signupText;

      // Check if all fields are filled
      if (!name || !email || !password) {
        toast.error(
          "Please enter the all field required: 'Name', 'Email', 'Password'"
        );
        return;
      }

      // Create the user in Firebase using email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      clearInputBox();
      toast.success("You Have Successfully SignUp!.");
      navigate("/signin");
    } catch (error) {
      // Handle different error cases from Firebase
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered."); // Email already used for another account
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format."); // Invalid email format
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters."); // Weak password
          break;
        default:
          toast.error("Signup failed: " + error.message); // General error message
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <Form
          signupText={signupText} // Passing form data as props
          handleSignupName={handleSignupName} // Passing handler for name field
          handleSignupEmail={handleSignupEmail} // Passing handler for email field
          handleSignupPassword={handleSignupPassword} // Passing handler for password field
          handleSignup={handleSignup} // Passing the submit handler
        />
      </div>
    </>
  );
};

export default Signup;
