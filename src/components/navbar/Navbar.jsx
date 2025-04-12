import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { toast } from "react-toastify";

const Navbar = () => {
  const {userId, setUserId} = useContext(UserContext)
  const navigate = useNavigate()

  const logoutUser = () =>{
    setUserId('')
    navigate('/')
    toast.success('You have successfully Logout!')
  }
  
  return (
    <>
      <div className="navbar-container">
        <div id="nav-title">
          <Link className="nav-link" to="/">
            <p>Busy Buy</p>
          </Link>
        </div>
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
            {userId && (<li>
              <Link className="nav-link" to="/myOrders">
                <img
                  src="https://media.lordicon.com/icons/wired/flat/139-basket.svg"
                  alt="order-image"
                />
                My Orders
              </Link>
            </li>)}
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
