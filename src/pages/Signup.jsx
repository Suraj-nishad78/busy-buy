import React, { useState } from "react";
import Form from "../components/Form/Form";

const Signup = () => {
  const [signupText, setSignUpText] = useState({
    name: "",
    email: "",
    password: "",
  });

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
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupText);
    clearInputBox();
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
