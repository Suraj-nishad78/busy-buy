import React, { useState } from "react";
import Card from "../components/card/Card";

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [removeBtn, setRemoveBtn] = useState(true)
  return (
    <>
      <div className="cart-container">
        <div id="cart-total-price">
          <p>Total Price:- ₹ 1798/-</p>
          <button>Purchase</button>
        </div>
        <div className="cart-container-box">
          <div className="cart-items">
            <Card cartItems={cartItems} removeBtn={removeBtn}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
