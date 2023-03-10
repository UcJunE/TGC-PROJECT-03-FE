import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import react router stuff
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import in pages
import Register from "./pages/Register";
import AboutUs from "./pages/about-us";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
//import in provider
import ProductsProvider from "./providers/ProductsProvider";
import UserProvider from "./providers/UsersProvider";
//import components
import Order from "./components/Order";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Error from "./components/Error";
import Toastify from "./components/Toastify";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <Toastify />
      <Router>
        <UserProvider>
          <NavigationBar />
          <Routes>
            {/* products route */}
            <Route
              path="/"
              element={
                <ProductsProvider>
                  <Products />
                </ProductsProvider>
              }
            />
            <Route
              path="/products/:productId/info"
              element={
                <ProductsProvider>
                  <ProductDetails />
                </ProductsProvider>
              }
            />
            {/* client route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* checkout route */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/checkout/error" element={<Error />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </UserProvider>
        <div className="container-fluid footer-container">
          <Footer />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
