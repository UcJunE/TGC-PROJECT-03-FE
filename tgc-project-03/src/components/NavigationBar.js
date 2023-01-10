import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";

import UserContext from "../contexts/UserContext";
import CartItem from "./CartItem";
export default function NavigationBar() {
  const userContext = useContext(UserContext);

  //state
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  //for the spinner
  const [cartLoading, setCartLoading] = useState(false);

  // off canvas cart controls
  const [show, setShow] = useState(false);

  // Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCartItems = async () => {
    console.log("get cart item");
    setCartLoading(false);

    const validToken = await userContext.refreshToken();
    if (!validToken) {
      return;
    } else {
      handleShow();
    }

    const cartItems = await userContext.getCartItems();
    setCartItems(cartItems);
    setCartLoading(true);
  };

  const renderCartItems = () => {
    // console.log("this is mistake ?????",cartItems);
    if (cartItems.length) {
      return (
        <ListGroup variant="flush">
          {cartItems.map((cartItem) => {
            {
              /* console.log(cartItem); */
            }
            return (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                confirmUpdateItem={confirmUpdateItem}
              />
            );
          })}
        </ListGroup>
      );
    } else {
      return (
        <div className="container mt-4">
          <h5>There are no items in your cart</h5>
        </div>
      );
    }
  };

  const confirmUpdateItem = async (product_id, quantity) => {
    let response = await userContext.updateCartItems(product_id, quantity);
    if (response) {
      toast.success("Item updated");
    } else {
      toast.error("Something went wrong");
      return false;
    }
    console.log(
      "this is the data pass from child to parent and to provider",
      product_id,
      quantity
    );
  };

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="logo" as={Link} to="/">
            THINKING
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userContext.checkIfAuthenticated() ? (
              // means that user is logged in
              <Nav className="ms-auto">
                {/* Shopping cart */}
                <Nav.Link eventKey="1" onClick={getCartItems}>
                  <FaShoppingCart style={{ fontSize: "30px" }} />
                  <span className="ms-2">Shopping Cart</span>
                </Nav.Link>
                {/* Accounts */}
                <NavDropdown title="Account">
                  <NavDropdown.Item eventKey="2" as={Link} to="/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    eventKey="3"
                    onClick={userContext.logoutUser}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link eventKey="2" as={Link} to="/register">
                  <FaShoppingCart style={{ fontSize: "30px" }} />
                  <span className="ms-2">Shopping Cart</span>
                </Nav.Link>
                <Nav.Link eventKey="1" as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Offcanvas (Cart) */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartLoading ? renderCartItems() : <h1>Loading</h1>}
          {/* Checkout */}
          {/* {cartLoading && cartItems.length ? (
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary">Checkout</Button>
            </div>
          ) : (
            ""
          )} */}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}

{
  /* <Nav.Link eventKey="3" onClick={userContext.logoutUser}>
Logout
</Nav.Link> */
}

{
  /* <Nav.Link eventKey="1" as={Link} to="/register">
register
</Nav.Link> */
}

//default link if haven authenticate
