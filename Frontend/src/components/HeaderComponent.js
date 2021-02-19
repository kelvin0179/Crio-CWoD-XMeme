import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Jumbotron, Button } from 'reactstrap';

//navbar and jumbotron from reactstrap
const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/"><img src="https://previews.123rf.com/images/saiful007/saiful0071708/saiful007170800072/83305369-letter-x-logo-slice-logo-design-concept-template.jpg" alt="logo" height="30" width="41" /></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                        </Nav>
                        <Button color="warning">
                            <a href="https://xmeme.mohitjaiswal.studio/swagger-ui" target="_blank">Swagger-UI</a>
                        </Button>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron className="bg-secondary">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>XMeme</h1>
                            <p>Create Your Own Meme Today !</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </div>
    );
}

export default Header;