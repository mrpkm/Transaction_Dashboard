import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>Transaction</Nav.Link>
          <Nav.Link as={Link} to="/statics" className={location.pathname === '/statics' ? 'active' : ''}>Statics</Nav.Link>
          <Nav.Link as={Link} to="/chart" className={location.pathname === '/chart' ? 'active' : ''}>Chart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
