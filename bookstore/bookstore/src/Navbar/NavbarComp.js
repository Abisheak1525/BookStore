import React, { useState, useEffect } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarComp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/categories?search=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    return (
        <div className='categories-container'>
            <div id="landing-nav-bar" className='fixed-top'>
                <Navbar expand="lg" style={{ backgroundColor: '#122c6f' }}>
                    <Container fluid>
                        <Navbar.Brand href="/">
                            <img src='/logo.png' className='nav-logo-zoom pl-2' style={{ width: '80px', height: '40px' }} alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                {/* Empty Nav for left alignment */}
                            </Nav>
                            <Nav className="ms-auto">
                                <Nav.Link href="#" onClick={toggleSearch} style={{ marginRight: '3px' }}>
                                    <FontAwesomeIcon icon={faSearch} style={{ fontSize: '20px', color: 'white' }} className='nav-icon' />
                                </Nav.Link>
                                {showSearch && (
                                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                                        <Form.Control
                                            type="search"
                                            placeholder="Search..."
                                            className="me-2"
                                            style={{ width: "250%" }}
                                            aria-label="Search"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </Form>
                                )}
                                <Nav.Link href="/" className="nav-text" style={{ color: 'white', marginRight: '15px' }}>Home</Nav.Link>
                                <Nav.Link href="/categories" className="nav-text" style={{ color: 'white', marginRight: '15px' }}>Categories</Nav.Link>
                                <Nav.Link href="/why-us" className="nav-text" style={{ color: 'white', marginRight: '15px' }}>Why Us</Nav.Link>
                                {isLoggedIn ? (
                                    <Nav.Link href="/profile" className="nav-icon" style={{ marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '20px', color: 'white' }} />
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link href="/login" className="nav-icon" style={{ marginRight: '15px' }}>
                                        <FontAwesomeIcon icon={faLock} style={{ fontSize: '20px', color: 'white' }} />
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="cart-icon nav-text">
                <Link to='/cart'><i className="fas fa-shopping-cart"></i></Link>
            </div>
        </div>
    );
};

export default NavbarComp;
