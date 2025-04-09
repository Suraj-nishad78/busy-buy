import React, { useState } from "react";
import Card from "../components/card/Card";

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
  return (
    <>
      <div className="cart-container">
        <div id="cart-total-price">
          <p>Total Price:- ₹ 1798/-</p>
          <button>Purchase</button>
        </div>
        <div className="cart-container-box">
          <div className="cart-items">
            <Card cartItems={cartItems}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
