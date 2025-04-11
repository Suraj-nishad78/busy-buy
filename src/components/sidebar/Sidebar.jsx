import { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { ProductContext } from "../../context";

const Sidebar = () => {
  const [rangeValue, setRangeValue] = useState(75000);
  const [selectedOptions, setSelectedOptions] = useState({
    Mens_Clothing: false,
    Womens_Clothing: false,
    jewelery: false,
    electronics: false,
  });
  const { products, setProductByPrice, setProductByCategory } =
    useContext(ProductContext);

  const handleRange = (e) => {
    setRangeValue(Number(e.target.value));
    const pricedProduct = products.filter(
      (product) => Number(product.price) < rangeValue
    );
    setProductByPrice(pricedProduct);
  };

  let categoryProduct;
  const handleSelectedBox = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const ProductByCategory = () =>{
    const men = selectedOptions.Mens_Clothing ? "men's clothing" : "";
    const women = selectedOptions.Womens_Clothing ? "women's clothing" : "";
    const jewelery = selectedOptions.jewelery ? "jewelery" : "";
    const electronics = selectedOptions.electronics ? "electronics" : "";

    const allowdCategory = [men, women, jewelery, electronics];

    categoryProduct = products.filter((product) =>
      allowdCategory.includes(product.category)
    );
    setProductByCategory(categoryProduct);
  }

  useEffect(() => {
    ProductByCategory();
  }, [selectedOptions]);
  return (
    <>
      <div className="sidebar-container">
        <div id="filter">
          <h2>Filter</h2>
          <p>Price: {rangeValue}</p>
          <input
            type="range"
            min="1"
            max="99999"
            value={rangeValue}
            onInput={handleRange}
          />
        </div>
        <div id="filter-checkbox">
          <h2>Category</h2>
          <label>
            <input
              type="checkbox"
              name="Mens_Clothing"
              checked={selectedOptions.Mens_Clothing}
              onChange={handleSelectedBox}
            />
            Men's Clothing
          </label>
          <label>
            <input
              type="checkbox"
              name="Womens_Clothing"
              checked={selectedOptions.Womens_Clothing}
              onChange={handleSelectedBox}
            />
            Woman's Clothing
          </label>
          <label>
            <input
              type="checkbox"
              name="jewelery"
              checked={selectedOptions.jewelery}
              onChange={handleSelectedBox}
            />
            Jewellery
          </label>
          <label>
            <input
              type="checkbox"
              name="electronics"
              checked={selectedOptions.electronics}
              onChange={handleSelectedBox}
            />
            Electronics
          </label>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
