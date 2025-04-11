import { useState } from "react";
import "./card.css";

const Card = ({ cartItems, products, removeBtn, addCartBtn }) => {
  return (
    <>
      <div className="card-box">
        <div className="card-image">
          <img src={products.image} alt={products.title} />
        </div>
        <div className="card-content">
          <p>
            {products.title.length > 34
              ? products.title.slice(0, 34) + "..."
              : products.title}
          </p>
          <div id="price-quantity">
            <h3>₹ {products.price}</h3>
            {removeBtn && (
              <div id="quantity-manage">
                <button>
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span>1</span>
                <button>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
          </div>
          {addCartBtn && <button id="add-to-cart">Add To Cart</button>}
          {removeBtn && <button id="remove-cart">Remove From Cart</button>}
        </div>
      </div>
    </>
  );
};

export default Card;
