import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import UserContext from "../contexts/UserContext";

export default function NavigationBar() {
  const userContext = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="logo" as={Link} to="/">
          THINKING
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link eventKey="1" as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/register">
              Register
            </Nav.Link>
            <Nav.Link eventKey="3" onClick={userContext.logout}>
             Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
