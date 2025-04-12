import { useContext, useEffect, useState } from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { cartRef, db } from "../../../config/firebaseinit";

const Card = ({ products, removeBtn, addCartBtn, fetchCartItem }) => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const [showAdding, setShowAdding] = useState(false);

  const checkProductInCart = async (id) => {
    try {
      const q = query(
        cartRef,
        where("productId", "==", id),
        where("userId", "==", userId)
      );
      const cartSnap = await getDocs(q);
      const existCartProduct = cartSnap.docs.map((cart) => ({
        id: cart.id,
        ...cart.data(),
      }));
      return existCartProduct;
    } catch (err) {
      console.log("Error while checking product exist: ", err);
    }
  };

  const handleAddTocart = async (products) => {
    try {
      if (!userId) {
        navigate("/signin");
        toast.error("Please Login First!");
        return;
      }
      const checkCart = await checkProductInCart(products.id);
      if (checkCart.length) {
        setShowAdding(true);
        incProductQuantity(checkCart[0]);
        toast.success("Increase Product Count!");
        setShowAdding(false);
        return;
      }
      setShowAdding(true);
      const cartProductDetails = {
        userId,
        productId: products.id,
        title: products.title,
        image: products.image,
        price: products.price,
        quantity: 1,
      };
      const productAdded = await addDoc(cartRef, cartProductDetails);
      setShowAdding(false);
      toast.success("Product Added Successfully!");
    } catch (error) {
      console.log("Error while add to cart product: ", error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const removeProduct = doc(db, "cart", id);
      await deleteDoc(removeProduct);
      fetchCartItem();
      toast.success("Item Removed Successfully!");
    } catch (err) {
      console.log("Error while remove item from cart: ", err);
    }
  };

  const incProductQuantity = async (product) => {
    try {
      const { id, ...rest } = products;
      const updatedProductDetails = {
        ...rest,
        quantity: product.quantity + 1,
      };
      const updatedProduct = doc(db, "cart", product.id);
      await updateDoc(updatedProduct, updatedProductDetails);
      fetchCartItem();
    } catch (err) {
      console.log("error while increasing quantiy of cart item: ", err);
    }
  };
  const decProductQuantity = async (product) => {
    try {
      const { id, ...rest } = products;
      const updatedProductDetails = {
        ...rest,
        quantity: product.quantity - 1,
      };
      if (updatedProductDetails.quantity == 0) {
        handleRemoveProduct(product.id);
        return;
      }
      const updatedProduct = doc(db, "cart", product.id);
      await updateDoc(updatedProduct, updatedProductDetails);
      fetchCartItem();
    } catch (err) {
      console.log("error while increasing quantiy of cart item: ", err);
    }
  };

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
                <button onClick={() => decProductQuantity(products)}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span>{products.quantity}</span>
                <button onClick={() => incProductQuantity(products)}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
          </div>
          {addCartBtn && (
            <button id="add-to-cart" onClick={() => handleAddTocart(products)}>
              {showAdding ? "Adding" : "Add To Cart"}
            </button>
          )}
          {removeBtn && (
            <button
              id="remove-cart"
              onClick={() => handleRemoveProduct(products.id)}
            >
              Remove From Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
