import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Menu() {
  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" href="#home">Login</Nav.Link>
            <Nav.Link as={Link} to="/signUp" href="#home">SignUp</Nav.Link>
            <Nav.Link as={Link} to="/contact" href="#home">Contact</Nav.Link>
            <Nav.Link as={Link} to="/showProduct" href="#home">Show Product</Nav.Link>
            <Nav.Link as={Link} to="/manageProduct" href="#home">Manage Product</Nav.Link>
            <Nav.Link as={Link} to="/addProduct" href="#home">Add Product</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Menu;