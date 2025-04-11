import "./pages.css";
import { useEffect, useState } from "react";
import { addDoc, getDocs } from "firebase/firestore";
import { GridLoader } from "react-spinners";

import Sidebar from "../components/sidebar/Sidebar";
import SearchProducts from "../components/search/SearchProducts";
import Card from "../components/card/Card";
import { productRef } from "../../config/firebaseinit";
import { ProductContext } from "../context";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [addCartBtn, setAddCartBtn] = useState(true);
  const [searchProduct, setSearchProduct] = useState([]);
  const [productByPrice, setProductByPrice] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [loader, setLoader] = useState(false);

  const getProducts = async () => {
    try {
      setLoader(true);
      const fetchProduct = await getDocs(productRef);
      const product = fetchProduct.docs.map((product) => ({
        id: product.id,
        ...product.data(),
      }));
      setLoader(false);
      setProducts(product);
    } catch (err) {
      console.log("Error while fetching product: ", err);
    }
  };

  const mainProduct = 
    searchProduct.length? searchProduct:
    productByPrice.length? productByPrice:
    productByCategory.length? productByCategory:
    products;

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {}, [
    products,
    searchProduct,
    productByPrice,
    productByCategory,
  ]);

  const sharedData = {
    products,
    setSearchProduct,
    setProductByPrice,
    setProductByCategory,
  };

  return (
    <>
      <ProductContext.Provider value={sharedData}>
        <div className="home-container">
          <Sidebar />
          <div className="content-container">
            <SearchProducts />
            {loader ? (
              <div id="product-loader">
                <GridLoader
                  color="#7864e4"
                  size={15}
                  speedMultiplier={1}
                  width={5}
                />
              </div>
            ) : (
              <div className="card-container">
                {mainProduct.map((product) => (
                  <Card
                    key={product.id}
                    products={product}
                    addCartBtn={addCartBtn}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ProductContext.Provider>
    </>
  );
};

export default Home;
