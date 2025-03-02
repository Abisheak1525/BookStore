import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '') {
      setEmailError('Email must be provided');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else if (email.endsWith('.in')) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ email, password }));
      navigate('/dashboard');
    } else {
      setEmailError(null);
      try {
        const response = await axios.post('http://localhost:9001/login', { email, password });
        if (response.status === 200) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/');
        }
      } catch (error) {
        setEmailError('Invalid Login Credentials');
      }
    }
  };

  return (
    <div>
      <div className="bg-light" id="login-id">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-white d-flex flex-row justify-content-start login-container shadow">
                <div className='d-flex flex-column'>
                  <img src="/loginpic.png" className="login-img" alt="login" />
                  <a href='/signup' className='new-user'>I am new member</a>
                </div>
                <div className="d-flex flex-column">
                  <h1 className="login-header mt-4 ml-3 mb-4">LOGIN</h1>
                  <form className="login-form m-4 p-4" onSubmit={handlesubmit}>
                    <FontAwesomeIcon icon={faEnvelope} fade style={{ color: "#122c6f", }} className='login-icon' />
                    <input
                      className='login-input'
                      type='email'
                      placeholder='Your Email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <FontAwesomeIcon icon={faLock} fade style={{ color: "#122c6f", }} className='login-icon' />
                    <input
                      className='login-input'
                      type='password'
                      placeholder='Your Password'
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {emailError && (
                      <div className="error-message" style={{ color: 'red', fontWeight: 500 }}>
                        <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '5px' }} />
                        {emailError}
                      </div>
                    )}
                    <button className='login-button' type='submit'>LOGIN</button>
                  </form>
                  <div className="or-divider">
                    <span>OR</span>
                  </div>
                  <div className="mt-2 ml-4 login-options">
                    <button className="button-icon mb-2">
                      <div className="d-flex flex-row">
                        <FontAwesomeIcon icon={faGoogle} fade style={{ color: "#ffffff", }} className='icon-button ml-1' />
                        <div className="ml-5 mt-1 pt-1">
                          <h1 className="button-h1">Login with Google</h1>
                        </div>
                      </div>
                    </button>
                    <button className="button-icon mb-2">
                      <div className="d-flex flex-row">
                        <FontAwesomeIcon icon={faFacebook} fade style={{ color: "#ffffff", }} className='icon-button ml-1' />
                        <div className="ml-5 mt-1 pt-1">
                          <h1 className="button-h1">Login with Facebook</h1>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
