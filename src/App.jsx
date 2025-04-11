import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//Components imported here
import Navbar from "./components/navbar/Navbar";
import { Home, Signin, Signup, Cart, MyOrders } from "./pages/pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      {/* Toaster Component */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
