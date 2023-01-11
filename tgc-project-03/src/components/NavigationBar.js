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
  const [reload, setReload] = useState(false); // Triggered by cart item
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  //for the spinner
  const [cartRender, setCartRender] = useState(false);

  // off canvas cart controls
  const [show, setShow] = useState(false);

  // Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    (async () => {
      if (reload) {
        // Get cart (reload)
        setCartRender(false); // Trigger spinner animation

        // Refresh token
        const valid = await userContext.refreshToken();

        if (!valid) {
          setShow(false); // Close cart offcanvas if open
        }

        const cartItems = await userContext.getCartItems();
        setCartItems(cartItems);
        setCartRender(true);
        setReload(false);
      }
    })();
  }, [reload]);

  const getCartItems = async () => {
    console.log("get cart item");
    setCartRender(false);

    const validToken = await userContext.refreshToken();
    if (!validToken) {
      return;
    } else {
      handleShow();
    }

    const cartItems = await userContext.getCartItems();
    setCartItems(cartItems);
    console.log("this is cart item", cartItems);
    let total = 0;
    cartItems.map((item) => {
      let quantity = item.quantity;
      let cost = item.jewelry.cost;
      let eachItemTotal = quantity * cost;
      total = total + eachItemTotal;
    });
    console.log("the total cost is >", total);
    setTotalCost(total);
    setReload(true);
    setCartRender(true);
  };

  const renderCartItems = () => {
    // console.log("this is mistake ?????",cartItems);
    if (cartItems.length) {
      return (
        <ListGroup variant="flush">
          {cartItems.map((cartItem) => {
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
      await getCartItems();
      return quantity;
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
          {cartRender ? renderCartItems() : <h1>Loading</h1>}
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
