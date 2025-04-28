import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//Components imported here
import Navbar from "./components/navbar/Navbar";
import {
  Home,
  Signin,
  Signup,
  Cart,
  MyOrders,
  PageNotFound,
} from "./pages/pages";
import { UserContext } from "./context";

function App() {
  // State to hold userId
  const [userId, setUserId] = useState("");

  // Shared context value
  const sharedDataUser = { userId, setUserId };

  // ProtectedRoute: Prevent access to private routes if not logged in
  const ProtectedRoute = ({ children }) => {
    if (!userId) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  //On mount: Get userId from localStorage
  useEffect(() => {
    const uId = localStorage.getItem("userId");
    setUserId(uId);
  }, []);

  // Update userId if it changes in localStorage (not usually needed like this)
  useEffect(() => {
    const uId = localStorage.getItem("userId");
    setUserId(uId);
  }, [userId]);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={sharedDataUser}>
          <Navbar />
          {/* Routes for Diffrent page */}
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
      {/* Toaster Component */}
      <ToastContainer
        // position="top-right"
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
