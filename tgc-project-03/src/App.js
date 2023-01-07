import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactUs from "./pages/contact-us";
import Home from "./pages/home";
import AboutUs from "./pages/about-us";
import Products from "./pages/Product";

//import in provider
import ProductsProvider from "./providers/ProductsProvider";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact US</Link>
            <Link to="/product">Product</Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/product"
          element={
            <ProductsProvider>
              <Products />
            </ProductsProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
