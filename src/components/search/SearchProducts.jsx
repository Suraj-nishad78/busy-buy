import { useState } from "react";
import "./searchProduct.css"

const SearchProducts = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
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
      </div>
    </>
  );
};

export default SearchProducts;
