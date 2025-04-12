import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//Components imported here
import Navbar from "./components/navbar/Navbar";
import { Home, Signin, Signup, Cart, MyOrders } from "./pages/pages";
import { UserContext } from "./context";

function App() {
  const [userId, setUserId] = useState("");
  const sharedDataUser = { userId, setUserId };

  const ProtectedRoute = ({ children }) => {
    if (!userId) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={sharedDataUser}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/myOrders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
      {/* Toaster Component */}
      <ToastContainer
        // position="top-right"
        position="top-left"
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
