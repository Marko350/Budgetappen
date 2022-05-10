import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

const Navigation = () => {
  const { currentUser, logout } = useAuthContext();

  return (
    <Navbar
      collapseOnSelect
      className="nav"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          <span className="brand" role="img">
            BudgetApp
          </span>
        </Link>
        <Navbar.Toggle className="nav" aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            { currentUser ? 
            <>
              <Nav.Link to={"/user"} as={Link} className="ms-4" eventKey="2">
              <span>My profile</span>
            </Nav.Link>
            <Nav.Link onClick={logout} to={"/"} as={Link} className="ms-4" eventKey="2">
              <span>Logout</span>
            </Nav.Link>
            </> : 
            <>
            <Nav.Link to={"/login"} as={Link} className="ms-4" eventKey="2">
              <span>Login</span>
            </Nav.Link>
            <Nav.Link to={"/register"} as={Link} className="ms-4" eventKey="3">
              <span>Register</span>
            </Nav.Link>
            </>
          }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;