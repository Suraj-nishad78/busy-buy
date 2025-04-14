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
  const [products, setProducts] = useState([]); // State to store all products fetched from Firestore
  const [addCartBtn, setAddCartBtn] = useState(true); // State to manage the visibility of the 'Add to Cart' button
  const [searchProduct, setSearchProduct] = useState([]); // State to store products filtered by search
  const [productByPrice, setProductByPrice] = useState([]); // State to store products filtered by price
  const [productByCategory, setProductByCategory] = useState([]); // State to store products filtered by category
  const [loader, setLoader] = useState(false); // State to manage loading state

  // Function to fetch products from Firestore
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

  // Determine which product list to display based on the active filters (search, price, category)
  const getFilteredProducts = () => {
    let filtered = [...products];
  
    if (searchProduct.length) {
      const searchIds = searchProduct.map((item) => item.id);
      filtered = filtered.filter((item) => searchIds.includes(item.id));
    }
  
    if (productByPrice.length) {
      const priceIds = productByPrice.map((item) => item.id);
      filtered = filtered.filter((item) => priceIds.includes(item.id));
    }
  
    if (productByCategory.length) {
      const categoryIds = productByCategory.map((item) => item.id);
      filtered = filtered.filter((item) => categoryIds.includes(item.id));
    }
  
    return filtered;
  };
  
  const mainProduct = getFilteredProducts();
  

  // Effect to fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {}, [
    products,
    searchProduct,
    productByPrice,
    productByCategory,
  ]);

  // Shared context data to be passed down to child components
  const sharedData = {
    products,
    setSearchProduct,
    setProductByPrice,
    setProductByCategory,
  };

  return (
    <>
      {/* Providing product data through context */}
      <ProductContext.Provider value={sharedData}>
        <div className="home-container">
          {/* Sidebar component with filtering options */}
          <Sidebar />
          <div className="content-container">
            {/* Search component to filter products */}
            <SearchProducts />
            {loader ? (
              // Show loading spinner while fetching products
              <div className="product-loader">
                <GridLoader
                  color="#7864e4"
                  size={15}
                  speedMultiplier={1}
                  width={5}
                />
              </div>
            ) : (
              // Render products in cards
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
