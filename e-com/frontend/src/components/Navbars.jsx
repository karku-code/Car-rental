import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbars.css';
import Logo from "../assets/logo.png";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyVerticallyCenteredModal(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:6969/login"
      : "http://localhost:6969/register";

    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const res = await axios.post(url, payload);

      if (isLogin) {
        toast.success(res.data.msg || "Login successful");
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('email', res.data.email); 
        setUsername(res.data.username);
        setEmail('');
        setPassword('');
        props.onHide();
      } else {
        toast.success(res.data.message || "Registered successfully");
        setIsLogin(true);
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Modal {...props} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="px-2">
            {!isLogin && (
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Username</label>
              </Form.Floating>
            )}
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </Form.Floating>
            <Button type="submit" variant="primary" className="w-100">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <span
                onClick={toggleMode}
                style={{ color: '#0d6efd', cursor: 'pointer' }}
              >
                {isLogin ? 'Register' : 'Login'}
              </span>
            </small>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

const Navbars = () => {
  const [modalShow, setModalShow] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
     
    setUsername(null);
    setShowLogout(false);
  };

  const handleInitialClick = () => {
    setShowLogout((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [modalShow]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Navbar expand="lg" className="container" style={{ borderBottom: "1px solid #e0e1dd" }}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontSize: '24px' }}>
            <img style={{ width: "40px" }} src={Logo} alt="Logo" /> Car Rental
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav className="align-items-center" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/cars">Cars</Nav.Link>
              <Nav.Link href="/book">My Bookings</Nav.Link>
            </Nav>

            {username ? (
              <div className="d-flex align-items-center position-relative" ref={logoutRef}>
                <div
                  onClick={handleInitialClick}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </div>

                {showLogout && (
                  <Button
                    onClick={handleLogout}
                    className='position-absolute'
                    style={{ top: '50px', left: '0', zIndex: 1000 }}
                    variant="outline-dark"
                    size="sm"
                  >
                    Logout
                  </Button>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setModalShow(true)}
                className='text-white'
                style={{ backgroundColor: "#000000", border: '1px solid black' }}
              >
                Login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Navbars;
