import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navBar.css';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = ({setProductSearched}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () =>{
    setProductSearched(searchTerm);
    setSearchTerm('');
  };

  const handleShowAll = () => {
    setProductSearched(''); 
    setSearchTerm(''); 
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand className="brand-color" as={Link} to="/" onClick={handleShowAll}>TIENDA DGT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link className="Item-color" href="#">Ofertas</Nav.Link>
            <NavDropdown className="links-color" title="Categorías" id="navbar-dropdown">
              <NavDropdown.Item className="links-color" as={Link} to= "/category/TV">Tv</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/category/CELULARES">Celulares</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/category/PORTATIL">Portatil</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/" onClick={handleShowAll}>Todos los productos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="links-color" href="#">Formulario de contacto</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex gap-2 Form" role="search">
            <CartWidget />
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;