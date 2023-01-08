import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import in pages
import ContactUs from "./pages/contact-us";
import AboutUs from "./pages/about-us";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
//import in provider
import ProductsProvider from "./providers/ProductsProvider";
import UserProvider from "./providers/UsersProvider";
//import components
import Toastify from "./components/Toastify";

function App() {
  return (
    <React.Fragment>
      <Toastify />
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/login">login</Link>
              <Link to="/contact">Contact US</Link>
              <Link to="/product">Product</Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
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
          <Route
            path="/login"
            element={
              <UserProvider>
                <Login />
              </UserProvider>
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
