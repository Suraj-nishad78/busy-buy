import "./OrderTable.css"

const OrderTable = () => {
  return (
    <>
      <div className="order-box">
        <h2>Ordered On:- 2025-04-07</h2>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fjallraven - Foldsack No....</td>
                <td>₹ 1099</td>
                <td>1</td>
                <td>₹ 1099</td>
              </tr>
              <tr>
                <td colSpan="3"></td>
                <td>₹ 1798</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
