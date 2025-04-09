import "./pages.css";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import { useEffect, useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const [signText, setSignText] = useState({
    email: "",
    password: "",
  });

  const handleSignEmail = (e) => {
    setSignText({
      ...signText,
      email: e.target.value,
    });
  };
  const handleSignPassword = (e) => {
    setSignText({
      ...signText,
      password: e.target.value,
    });
  };

  const clearInputBox = () => {
    setSignText({
      email: "",
      password: "",
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    console.log(signText);
    clearInputBox();
  };

  useEffect(()=>{

  }, [signText])

  return (
    <>
      <div className="signin-container">
        <h1>Sign In</h1>
        <Form
            signText={signText}
          handleSignEmail={handleSignEmail}
          handleSignPassword={handleSignPassword}
          handleSignin={handleSignin}
        />
        <p onClick={() => navigate("/signup")}>Or SignUp instead</p>
      </div>
    </>
  );
};

export default Signin;
