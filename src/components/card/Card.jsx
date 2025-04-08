import "./card.css"

const Card = () => {
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
                <h3>₹ 1099</h3>
                <button>Add To Cart</button>
              </div>
            </div>
    </>
  )
}

export default Card
