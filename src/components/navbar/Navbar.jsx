import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebaseinit";

const Navbar = () => {

  // Access userId and method to update it from context
  const {userId, setUserId} = useContext(UserContext)
  const navigate = useNavigate()

  // Logout handler
  const logoutUser = async () => {
    await signOut(auth);              // Sign out from Firebase Auth
    localStorage.clear();             // Clear local storage
    setUserId('');                    // Clear context userId
    navigate('/');                    // Redirect to home page
    toast.success('You have successfully Logout!'); // Show toast
  };
  
  return (
    <>
      <div className="navbar-container">
        {/* App Title */}
        <div id="nav-title">
          <Link className="nav-link" to="/">
            <p>Busy Buy</p>
          </Link>
        </div>
        {/* Navigation Items */}
        <div id="nav-items">
          <ul>
            <li>
              <Link className="nav-link" to="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3nxihNakgVW-ajUlSa55fuOrnhmwPsR4qA&s"
                  alt="home-image"
                />
                Home
              </Link>
            </li>
            {/* My Orders (Visible only if logged in) */}
            {userId && (<li>
              <Link className="nav-link" to="/myOrders">
                <img
                  src="https://media.lordicon.com/icons/wired/flat/139-basket.svg"
                  alt="order-image"
                />
                My Orders
              </Link>
            </li>)}
            {/* Cart (Visible only if logged in) */}
            {userId && (<li>
              <Link className="nav-link" to="/cart">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcyZeWoglMZ4CxywEZrJRq-johB_oGznFEg&s"
                  alt="cart-image"
                />
                Cart
              </Link>
            </li>)}
            <li>
            {/* Logout if logged in, otherwise Signin */}
              {userId?
              (<Link className="nav-link" to="" onClick={logoutUser}>
              <img
                src="https://media.lordicon.com/icons/wired/lineal/2185-logout.gif"
                alt="sign-image"
              />
              Logout
            </Link>)
              :(<Link className="nav-link" to="/signin">
                <img
                  src="https://media.lordicon.com/icons/wired/lineal/2185-logout.gif"
                  alt="sign-image"
                />
                Signin
              </Link>)}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
