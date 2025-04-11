import { useState, useContext } from "react";
import "./searchProduct.css";
import { ProductContext } from "../../context";
import { getDocs } from "firebase/firestore";
import { productRef } from "../../../config/firebaseinit";

const SearchProducts = () => {
  const [searchText, setSearchText] = useState("");

  const { products, setSearchProduct } =
    useContext(ProductContext);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    const searchProduct = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchProduct(searchProduct);
  };
  
  const handleCross = () => {
    setSearchText("");
    setSearchProduct([]);
  };
  return (
    <>
      <div id="search-input">
        <input
          type="text"
          placeholder="Search By Name"
          value={searchText}
          onInput={handleSearchText}
        />
        {searchText && <i class="fa-solid fa-xmark" onClick={handleCross}></i>}
      </div>
    </>
  );
};

export default SearchProducts;
