import { useState, useContext } from "react";
import "./searchProduct.css";
import { ProductContext } from "../../context";
import { getDocs } from "firebase/firestore";
import { productRef } from "../../../config/firebaseinit";

const SearchProducts = () => {

  // State to store the current search input
  const [searchText, setSearchText] = useState("");

  // Get global product data and function to update searched results
  const { products, setSearchProduct } =
    useContext(ProductContext);

   //  Handle search input and filter products based on title match 
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    const searchProduct = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchProduct(searchProduct);
  };
  
  // Clear search input and reset search results
  const handleCross = () => {
    setSearchText("");
    setSearchProduct([]);
  };
  return (
    <>
      <div id="search-input">
      {/* Search Input */}
        <input
          type="text"
          placeholder="Search By Name"
          value={searchText}
          onInput={handleSearchText}
        />
        {/* Clear button shown only when input is not empty */}
        {searchText && <i class="fa-solid fa-xmark" onClick={handleCross}></i>}
      </div>
    </>
  );
};

export default SearchProducts;
