import "./pages.css";
import OrderTable from "../components/orderTable/OrderTable";

const MyOrders = () => {
  return (
    <>
      <div className="orders-container">
        <h1>Your Orders</h1>
        <div className="order-details">
          <OrderTable />
          <OrderTable />
        </div>
      </div>
    </>
  );
};

export default MyOrders;
