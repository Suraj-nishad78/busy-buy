import { useEffect, useState } from "react";
import "./pages.css";

const Home = () => {
  const [rangeValue, setRangeValue] = useState(50000);
  const [selectedOptions, setSelectedOptions] = useState({
    Mens_Clothing: false,
    Womens_Clothing: false,
    Jewellery: false,
    Electronics: false,
  });

  const handleRange = (e) => {
    setRangeValue(Number(e.target.value));
  };

  const handleSelectedBox = (e) => {
    const {name, checked} = e.target;
    setSelectedOptions((prev)=>({
        ...prev,
        [name]: checked,
    }))
  };

  useEffect(()=>{
  }, [selectedOptions])

  return (
    <>
      <div className="home-container">
        <div className="sidebar-container">
          <div id="filter">
            <h2>Filter</h2>
            <p>Price: {rangeValue}</p>
            <input
              type="range"
              min="1"
              max="99999"
              value={rangeValue}
              onChange={handleRange}
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
                name="Jewellery"
                checked={selectedOptions.Jewellery}
                onChange={handleSelectedBox}
              />
              Jewellery
            </label>
            <label>
              <input
                type="checkbox"
                name="Electronics"
                checked={selectedOptions.Electronics}
                onChange={handleSelectedBox}
              />
              Electronics
            </label>
          </div>
        </div>
        <div className="content-container">content</div>
      </div>
    </>
  );
};

export default Home;
