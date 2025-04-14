import "./pages.css";
import { useContext, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { orderRef } from "../../config/firebaseinit";
import { GridLoader } from "react-spinners";

import OrderTable from "../components/orderTable/OrderTable";
import { UserContext } from "../context";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // State to store all orders fetched from Firestore
  const [userOrders, setUserOrders] = useState([]); // State to store orders belonging to the current user
  const [loader, setLoader] = useState(true); // State to manage loading state

  // Access the userId from the context (global state)
  const { userId } = useContext(UserContext);

  // Fetch orders from Firestore and store them in the 'orders' state
  const fetchOrdersFromFireStore = async () => {
    try {
      setLoader(true); // Set loader to true when starting the fetch process
      const getOrders = await getDocs(orderRef); // Get all orders from Firestore
      const allOrders = getOrders.docs.map((order) => ({
        id: order.id,
        ...order.data(), // Map each order document to an object with the document data
      }));
      setLoader(false); // Set loader to false once the data is fetched
      setOrders(allOrders); // Update the 'orders' state with the fetched data
    } catch (err) {
      console.log("Error while fetching orders: ", err); // Log any errors
    }
  };

  // Filter orders to get only the ones belonging to the current user
  const getUserOrders = () => {
    const user = orders.filter((order) => order.userId == userId);
    setUserOrders(user);
  };

  // Use effect to fetch orders when the component mounts
  useEffect(() => {
    fetchOrdersFromFireStore();
  }, []);

  // Use effect to update userOrders whenever 'orders' state changes
  useEffect(() => {
    getUserOrders();
  }, [orders]);

  return (
    <>
    {/* If userOrders has items, display them */}
      {userOrders.length ? (
        <div className="orders-container">
          <h1>Your Orders</h1>
          <div className="order-details">
            {userOrders.map((orders) => (
              <OrderTable key={orders.id} order={orders} /> // Render OrderTable component for each order
            ))}
          </div>
        </div>
      ) : loader ? (
        <div className="product-loader">
          <GridLoader color="#7864e4" size={15} speedMultiplier={1} width={5} />
        </div>
      ) : (
        <h1>No Order Found!</h1>
      )}
    </>
  );
};

export default MyOrders;
