import "./pages.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context";
import Form from "../components/Form/Form";
import { getDocs } from "firebase/firestore";
import { userRef } from "../../config/firebaseinit";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [signText, setSignText] = useState({
    email: "",
    password: "",
  });
  const [userArray, setUserArray] = useState([]);
  const { userId, setUserId } = useContext(UserContext);

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
    const {email, password} = signText;

    if(!email || !password){
      toast.error("Please fill the required field!: 'Email' & 'Password'")
      return;
    }

    const checkEmail = userArray.find(user=>user.email === email)
    if(!checkEmail){
      toast.error("You have entered wrong email!.")
      clearInputBox();
      return;
    }
    const findUser = userArray.find(user=>user.email === email && user.password === password)
    if(!findUser){
      
      toast.error("You have entered wrong credentials!")
      clearInputBox();
      return;
    }
    setUserId(findUser.id);
    clearInputBox();
    toast.success("You have succeefully logged in!")
    navigate("/")
  };

  const fetchUsers = async () => {
    try {
      const usersdata = await getDocs(userRef);
      const users = usersdata.docs.map(user=>({
        id:user.id,
        ...user.data()
      }))
      setUserArray(users);
    } catch (err) {
      console.log("Error while fetching users: ", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  });
  useEffect(() => {}, [signText]);

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
