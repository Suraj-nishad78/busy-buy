import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

import {
  setName,
  setEmail,
  setPassword,
  setClearInputBox,
  createUserThunk,
  setErrorEmpty,
} from "../store/reducers/user.reducer";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  // To navigate programmatically after successful signup
  const navigate = useNavigate();
  const { name, email, password, success, error } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  // Handling name input change
  const handleSignupName = (e) => {
    dispatch(setName(e.target.value));
  };

  // Handling email input change
  const handleSignupEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  // Handling password input change
  const handleSignupPassword = (e) => {
    dispatch(setPassword(e.target.value));
  };

  // Handle the signup process
  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      // Check if all fields are filled
      if (!name || !email || !password) {
        toast.error(
          "Please enter the all field required: 'Name', 'Email', 'Password'"
        );
        return;
      }
      // Clear input fields after successful signup
      const user = await dispatch(createUserThunk({ email, password }));
      if (user.meta.requestStatus == "rejected") {
        return;
      }
      dispatch(setClearInputBox());
      navigate("/signin");
    } catch (error) {
      console.log("Error while signup: ", error);
    }
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
      <div className="signup-container">
        <h1>Sign Up</h1>
        <Form
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
