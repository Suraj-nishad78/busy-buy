import React, { useContext, useEffect, useState } from "react";
import Card from "../components/card/Card";
import {
  onSnapshot,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";

import { cartRef, db, orderRef } from "../../config/firebaseinit";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // State to control visibility of the 'Remove' button
  const [removeBtn, setRemoveBtn] = useState(true);

  // State to store the total price of the cart items
  const [totalPrice, setTotalPrice] = useState(0);

  // State to manage loading state while fetching data
  const [loader, setLoader] = useState(false);

  // Extracting userId from UserContext
  const { userId } = useContext(UserContext);

  const navigate = useNavigate()

  // Function to calculate the total price of the cart items
  const userCartTotalPrice = () => {
    const userTotalPrice = cartItems.reduce((acc, cart) => {
      return acc + cart.price * cart.quantity;
    }, 0);
    setTotalPrice(userTotalPrice);
  };

  // Function to remove a cart item from the Firestore collection
  const removeCartItem = async (id) => {
    try {
      const removeItem = doc(db, "cart", id);
      await deleteDoc(removeItem);
      // fetchCartItem();
    } catch (err) {
      console.log("Error while removing item from cart: ", err);
    }
  };

  // Function to handle the purchase of items in the cart
  const purchaseProduct = async (cartItems) => {
    try {
      const cartIds = [];
      const purchaseArray = cartItems.map((cart) => {
        const { id, title, price, quantity, productId } = cart;
        const orders = {
          productId,
          title,
          price,
          quantity,
        };
        cartIds.push({ id });
        return orders;
      });

      const date = new Date();

      const purchaseDetails = {
        userId,
        date: date.toLocaleDateString(),
        purchaseItem: purchaseArray,
      };
      await addDoc(orderRef, purchaseDetails);
      toast.success("Item Purcase Successfully!");
      cartIds.forEach((cart) => removeCartItem(cart.id));
      navigate('/myOrders')
    } catch (err) {
      console.log("Error while purchasing: ", err);
    }
  };

  // useEffect to fetch cart items for the logged-in user from Firestore
  const fetchCartItem = () => {
    if (!userId) return;

    setLoader(true); // turn on loader here
    const q = query(cartRef, where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedCart = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(updatedCart);
      setLoader(false); // turn off loader here
    });

    // Cleanup the listener when component unmounts or userId changes
    return () => unsubscribe();
  };
  useEffect(() => {
    fetchCartItem();
  }, [userId]);

  // Update the total price whenever the cart items change
  useEffect(() => {
    userCartTotalPrice();
  }, [cartItems]);

  return (
    <>
      {cartItems.length ? (
        <div className="cart-container">
          <div id="cart-total-price">
            <p>Total Price:- ₹ {totalPrice}/-</p>
            <button onClick={() => purchaseProduct(cartItems)}>Purchase</button>
          </div>
          <div className="cart-container-box">
            <div className="cart-items">
              {cartItems.map((product) => (
                <Card
                  key={product.id}
                  products={product}
                  removeBtn={removeBtn}
                />
              ))}
            </div>
          </div>
        </div>
      ) : loader ? (
        <div className="product-loader">
          <GridLoader color="#7864e4" size={15} speedMultiplier={1} width={5} />
        </div>
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </>
  );
};

export default Cart;
