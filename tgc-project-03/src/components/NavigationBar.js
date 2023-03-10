import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import UserContext from "../contexts/UserContext";
import CartItem from "./CartItem";
import Spinner from "./Spinner";
export default function NavigationBar() {
  const userContext = useContext(UserContext);

  //state
  const [reload, setReload] = useState(false); // Triggered by cart item
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState("");
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
      return total;
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
                refreshCart={getCartItems}
              />
            );
          })}
          <div className="my-bold mt-3 nav-text">Total: ${totalCost / 100}</div>
          <button className="btn cart-btn btn-sm mt-2" onClick={checkout}>
            CHECKOUT
          </button>
        </ListGroup>
      );
    } else {
      return (
        <div className="container mt-4">
          <div className="card-body">
            <div className="col-sm-12 text-center">
              <img
                src="https://i.imgur.com/dCdflKN.png"
                width="130"
                height="130"
                className="img-fluid mb-4 mr-3"
                alt="cart-img"
              />
              <h3 className="mt-2 cart-text">
                <strong>Opps...</strong>
              </h3>
              <h4 className="cart-text">Your cart is empty</h4>
              <h6 className="my-3 cart-text">
                Add something to make you happy
              </h6>
              <button
                className="btn product-btn mt-2"
                onClick={() => {
                  return navigateTo("/"), setShow(false);
                }}
              >
                Explore
              </button>
            </div>
          </div>
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
  };

  const errorBox = () => {
    toast.error("Please register to proceed");
  };

  const checkout = () => {
    setShow(false); // Close cart offcanvas
    navigateTo("/checkout");
  };

  return (
    <React.Fragment>
      <Navbar className="nav-container" expand="md">
        <Container>
          <Navbar.Brand className="logo-container" as={Link} to="/">
            <img
              className="logo"
              src={require("../assets/images/brand-logo.png")}
              alt="brand-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userContext.checkIfAuthenticated() ? (
              // means that user is logged in
              <Nav className="ms-auto">
                {/* Shopping cart */}
                <Nav.Link eventKey="1" onClick={getCartItems}>
                  <FaShoppingCart className="shopping-cart" />
                  {cartItems.length ? (
                    <Fragment>
                      <Badge className="badge-text" bg="secondary">
                        {cartItems.length}
                      </Badge>
                      <span className="visually-hidden"></span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Badge className="badge-text" bg="secondary">
                        0
                      </Badge>
                      <span className="visually-hidden"></span>
                    </Fragment>
                  )}
                </Nav.Link>
                {/* Accounts */}
                <NavDropdown className="nav-text" title="Account">
                  <NavDropdown.Item className="nav-text">
                    Hi {userContext.name}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="nav-text"
                    eventKey="2"
                    as={Link}
                    to="/order"
                  >
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="nav-text"
                    eventKey="3"
                    onClick={userContext.logoutUser}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto mt-3">
                <Nav.Link
                  onClick={errorBox}
                  eventKey="3"
                  as={Link}
                  to="/register"
                >
                  <FaShoppingCart style={{ fontSize: "30px" }} />
                  <span className="ms-2 nav-text">Shopping Cart</span>
                </Nav.Link>
                <Nav.Link eventKey="4" as={Link} to="/login">
                  <FaUser style={{ fontSize: "30px" }} />
                  <span className="ms-2 nav-text">Login</span>
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
          {cartRender ? renderCartItems() : <Spinner />}
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}
