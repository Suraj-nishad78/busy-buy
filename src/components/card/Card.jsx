import { useState } from "react";
import "./card.css";

const Card = ({ cartItems, products }) => {
  return (
    <>
      <div className="card-box">
        <div className="card-image">
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="product-image"
          />
        </div>
        <div className="card-content">
          <p>Fjallraven - Foldsack No. 1 Backpac...</p>
          <div id="price-quantity">
            <h3>₹ 1099</h3>
            <div id="quantity-manage">
              <button><i class="fa-solid fa-minus"></i></button>
              <span>1</span>
              <button><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <button id="add-to-cart">Add To Cart</button>
          <button id="remove-cart">Remove From Cart</button>
        </div>
      </div>
    </>
  );
};

export default Card;
