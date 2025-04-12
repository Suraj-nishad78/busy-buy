import React, { useContext, useEffect, useState } from "react";
import Card from "../components/card/Card";
import { addDoc, getDocs } from "firebase/firestore";
import { cartRef, orderRef } from "../../config/firebaseinit";
import { UserContext } from "../context";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [removeBtn, setRemoveBtn] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId } = useContext(UserContext);

  const fetchCartItem = async () => {
    try {
      const carts = await getDocs(cartRef);
      const cartProducts = carts.docs.map((cart) => ({
        id: cart.id,
        ...cart.data(),
      }));
      const userCartItem = cartProducts.filter(
        (cart) => cart.userId === userId
      );
      setCartItems(userCartItem);
    } catch (error) {
      console.log("Error while fetching cart product: ", error);
    }
  };

  const userCartTotalPrice = () => {
    const userTotalPrice = cartItems.reduce((acc, cart) => {
      return acc + cart.price * cart.quantity;
    }, 0);
    setTotalPrice(userTotalPrice);
  };

  const purchaseProduct = async (cartItems) => {
    try {
      const purchaseArray = cartItems.map((cart) => {
        const { title, price, quantity, productId } = cart;
        const orders = {
          productId,
          title,
          price,
          quantity,
        };
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
    } catch (err) {
      console.log("Error while purchasing: ", err);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

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
                  fetchCartItem={fetchCartItem}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </>
  );
};

export default Cart;
