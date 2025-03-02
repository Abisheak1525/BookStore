import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
      setEmailError('Email must be provided');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else if (email.endsWith('.in')) {
      setEmailError('Emails with ".in" domain are not allowed');
    } else if (name === '') {
      setNameError('Name must be provided');
    } else if (password === '') {
      setPasswordError('Password must be provided');
    } else {
      setEmailError(null);
      setNameError(null);
      setPasswordError(null);

      try {
        const response = await fetch('http://localhost:9001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, name, password })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data));
          navigate('/login');
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <div className="bg-light" id="sign-id">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-white d-flex flex-row justify-content-start signup-container shadow">
                <div className="d-flex flex-column">
                  <h1 className="login-header mt-4 ml-4 mb-1">SIGNUP</h1>
                  <form className="login-form m-5 p-4" id='signup-form-id'>
                    <input 
                      className='signup-input' 
                      type='email' 
                      placeholder='Your Email' 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faEnvelope} fade style={{color: "#122c6f",}}  className='login-icon'/>
                    <br />
                    {emailError && (
                      <div className="error-message" style={{color: 'red', fontWeight: 500}}>
                        <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: '5px'}}/>
                        {emailError}
                      </div>
                    )}
                    <input 
                      className='signup-input' 
                      type='text' 
                      placeholder='Your Name' 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faUser} fade style={{color: "#122c6f",}} className='login-icon'/>
                    <br />
                    {nameError && (
                      <div className="error-message" style={{color: 'red', fontWeight: 500}}>
                        <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: '5px'}}/>
                        {nameError}
                      </div>
                    )}
                    <input 
                      className='signup-input' 
                      type='password' 
                      placeholder='Your Password' 
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faLock} fade style={{color: "#122c6f",}} className='login-icon'/>
                    {passwordError && (
                      <div className="error-message" style={{color: 'red', fontWeight: 500}}>
                        <FontAwesomeIcon icon={faExclamationCircle} style={{marginRight: '5px'}}/>
                        {passwordError}
                      </div>
                    )}
                    <button className='login-button' id = 'signup-button' onClick={handlesubmit}>SIGNUP</button>
                  </form>
                </div>
                <div className='d-flex flex-column ml-5'>
                  <img src="/signuppic.png" className="login-img" />
                  <a href='/login' className='new-user'>I am already member</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
