import React from 'react';
import {LogOut} from '../../firebase/fbFunctions';
import {Navbar, Nav, Dropdown} from 'react-bootstrap';

const NavBar = ({isAuthenticated, user}) => {
    return(
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Clases Online</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
            </Nav>
            <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" /> 

                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {`Bienvenido(a) ${user.displayName}`}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href={`/dashboard/`}>Perfil</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => LogOut()}>Salir</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;