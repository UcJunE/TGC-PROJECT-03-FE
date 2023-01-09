import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import Toastify from "./components/Toastify";
import NavigationBar from "./components/NavigationBar";

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
              path="/product/:productId/view"
              element={
                <ProductsProvider>
                  <ProductDetails />
                </ProductsProvider>
              }
            />
            {/* client route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
