
import "./pages.css";

import Sidebar from "../components/sidebar/Sidebar";
import SearchProducts from "../components/search/SearchProducts";
import Card from "../components/card/Card";

const Home = () => {

  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="content-container">
          <SearchProducts />
          <div className="card-container">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
