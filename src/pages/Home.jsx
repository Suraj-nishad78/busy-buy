
import "./pages.css";

import Sidebar from "../components/sidebar/Sidebar";
import SearchProducts from "../components/search/SearchProducts";
import Card from "../components/card/Card";
import { useState } from "react";

const Home = () => {

  const [products, setProducts] = useState([])

  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="content-container">
          <SearchProducts />
          <div className="card-container">
            <Card products={products}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
