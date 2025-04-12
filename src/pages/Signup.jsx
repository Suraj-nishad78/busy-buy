import React, { useState } from "react";
import { addDoc } from "firebase/firestore";

import Form from "../components/Form/Form";
import { userRef } from "../../config/firebaseinit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupText, setSignUpText] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleSignupName = (e) => {
    setSignUpText({
      ...signupText,
      name: e.target.value,
    });
  };
  const handleSignupEmail = (e) => {
    setSignUpText({
      ...signupText,
      email: e.target.value,
    });
  };
  const handleSignupPassword = (e) => {
    setSignUpText({
      ...signupText,
      password: e.target.value,
    });
  };
  const clearInputBox = () => {
    setSignUpText({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const{name, email, password} = signupText;
      if(!name || !email || !password){
        toast.error("Please enter the all field required: 'Name', 'Email', 'Password'")
        return;
      }
      await addDoc(userRef, signupText)
      clearInputBox();
      toast.success("You Have Successfully SignUp!.")
      navigate("/signin")
    } catch (error) {
      console.log("Error while signup: ", error);
    }
  };
  return (
    <>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <Form
          signupText={signupText}
          handleSignupName={handleSignupName}
          handleSignupEmail={handleSignupEmail}
          handleSignupPassword={handleSignupPassword}
          handleSignup={handleSignup}
        />
      </div>
    </>
  );
};

export default Signup;
