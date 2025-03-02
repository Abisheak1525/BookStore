import React from 'react'
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.css';


const FooterComp = () => {
  return (
    <div>
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-section books">
          <h3>Books</h3>
          <ul>
            <li>Whispers of Wisdom</li>
            <li>Adventures Beyond</li>
            <li>Treasure Island</li>
            <li>War and Peace</li>
            <li>Madness of Mask</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact us</h3>
          <ul>
            <li>Anna Nagar, Chennai, Tamil Nadu.</li>
            <li>
              <i className="fas fa-envelope"></i> booknook@gmail.com
            </li>
            <li>
              <i className="fas fa-phone"></i> +91 9876543210
            </li>
          </ul>
        </div>
        <div className="footer-section about">
          <img src="/logo.png" alt="BookStore Logo" className="logo" />
          <p>Give Books a Second Life.</p>
          <div className="social-icons nav-text">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
        <div className="footer-section menu">
          <h3>Menu</h3>
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>Why Us</li>
            <li>Orders</li>
          </ul>
        </div>
        <div className="footer-section account">
          <h3>Your Account</h3>
          <ul>
            <li>New Account</li>
            <li>Login</li>
            <li>Register</li>
            <li>Cart</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{color: 'black', fontWeight: '500'}}>©2024 BookNook All Rights Reserved.</p>
      </div>
      </footer>
    </div>
  )
}

export default FooterComp
