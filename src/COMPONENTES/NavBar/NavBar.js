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
            <br />
            <NavDropdown className="links-color" title="Categorías" id="navbar-dropdown">
              <NavDropdown.Item className="links-color" as={Link} to= "/category/papeleria">TV</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/category/accesorios">CELULARES</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/category/ropa">PORTATIL</NavDropdown.Item>
              <NavDropdown.Item className="links-color" as={Link} to= "/" onClick={handleShowAll}>Todos los productos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="links-color" href="#">Formulario de contacto</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex gap-2" role="search">
            <FormControl className="me-2" type="search" name="search" placeholder="Buscar producto" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button variant="outline-success" type="button" onClick={handleSearch} className="button-color">Buscar</Button>
            <CartWidget />
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;