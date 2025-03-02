import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartModule/CartContext';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckoutComponent.css';
import CreditCardModal from '../PaymentModule/CreditCardModal';
import UPIModal from '../PaymentModule/UPIModal';
import CashOnDeliveryModal from '../PaymentModule/CashOnDeliveryModal';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartCourses, totalAmountCalculation } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    email: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showCODModal, setShowCODModal] = useState(false);
  const [sellerAddress] = useState('123 Book Street, Booktown, BK 12345');
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [paymentType, setPaymentType] = useState('cod');
  const [errorMessage, setErrorMessage] = useState('');
  

  useEffect(() => {
    console.log(cartCourses); // To check if it's changing unexpectedly
    if (cartCourses.length === 0) {
      navigate('/cart');
    }
  }, [cartCourses.length, navigate]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { firstName, lastName, streetAddress, city, state, pinCode, phone, email } = formData;
  
    // Validate form data
    if (!firstName || !lastName || !streetAddress || !city || !state || !pinCode || !phone || !email) {
      setErrorMessage('Please enter all the details');
      return;
    } else {
      setErrorMessage('');  // Clear any previous error message
    }
  
    // Proceed with API submission if validation passes
    const checkoutData = {
      firstName,
      lastName,
      country: formData.country,
      streetAddress,
      apartment: formData.apartment,
      city,
      state,
      pinCode,
      phone,
      email,
      deliveryMode,
      paymentType,
    };
  
    // Send data to backend
    fetch('http://localhost:9001/main/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
  })
  .then(response => {
      // Check if the response is OK (status code 200)
      if (!response.ok) {
          return response.text().then(text => {
              // Handle non-JSON error responses
              throw new Error(`Error: ${text}`);
          });
      }
  
      // Check if the content type is JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
          return response.json();
      } else {
          throw new Error('Expected JSON response but got non-JSON');
      }
  })
  .then(data => {
      console.log('Success:', data);
      // Navigate to confirmation page
      alert('Your order will be reviewed shortly.');
      navigate('/');
  })
  .catch((error) => {
      console.error('Error:', error.message);
      // Optionally, show an error message in the UI
  });
  
  
  };
  
const handleConfirmOrder = () => {
      navigate('/confirmation');  // Navigate to confirmation page
};



  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === 'credit') {
      setShowCreditCardModal(true);
      setShowUPIModal(false);
      setShowCODModal(false);
    } else if (type === 'upi') {
      setShowUPIModal(true);
      setShowCreditCardModal(false);
      setShowCODModal(false);
    } else if (type === 'cod') {
      setShowCODModal(true);
      setShowCreditCardModal(false);
      setShowUPIModal(false);
    }
  };
  

  return (
    <div>
      <NavbarComp />
      <div className="checkout-page mt-5 mb-5">
        <h2 className="text-center">Checkout</h2>
        <div className="checkout-container animated-container">
          <div className="checkout-form animated-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Country / Region <span className="required">*</span></label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    // required
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Street Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    // required
                  />
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className='mt-2'
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Town / City <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>State <span className="required">*</span></label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    // required
                  >
                    <option value="">Select an option...</option>
                    <option value="State1">Tamil Nadu</option>
                    <option value="State2">Kerala</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>PIN Code <span className="required">*</span></label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>Phone <span className="required">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  // required
                />
              </div>
            </form>
          </div>
          <div className="order-summary animated-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartCourses.map((item) => (
                <li key={item.product.id}>
                  {item.product.name} - ₹{item.product.newPrice} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total: ₹{totalAmountCalculation()}</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="btn-confirm-order animated-button" onClick={handleSubmit}>CONFIRM ORDER</button>
            <br />
            <button className="btn-back-to-cart" onClick={handleBackToCart}>BACK TO CART</button>
          </div>
        </div>
      </div>
      <FooterComp />

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-left">
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#122c6f', fontWeight: '600'}}>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Seller Address:</strong> {sellerAddress}</p>
          <Form>
            <Form.Group>
              <Form.Label>Mode of Delivery</Form.Label>
              <div className="delivery-options">
                <button
                  type="button"
                  className={`delivery-option ${deliveryMode === 'home' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('home')}
                >
                  <i className="fa-solid fa-user-group checkout-icon"></i> Local Pickup
                </button>
                <button
                  type="button"
                  className={`delivery-option ${deliveryMode === 'collect' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('collect')}
                >
                  <i className="fa-solid fa-box-open checkout-icon"></i> Courier
                </button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Type</Form.Label>
              <div className="payment-options">
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'credit' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('credit')}
                >
                  <i className="fa fa-credit-card checkout-icon"></i> Credit Card
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'upi' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('upi')}
                >
                  <i className="fa fa-credit-card checkout-icon"></i> UPI
                </button>
                <button
                  type="button"
                  className={`payment-option ${paymentType === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentTypeChange('cod')}
                >
                  <i className="fa fa-credit-card checkout-icon"></i> Cash On Delivery
                </button>
              </div>
            </Form.Group>
          </Form>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>Confirm Order</Button>
        </Modal.Body>
      </Modal>

      <CreditCardModal show={showCreditCardModal} onHide={() => setShowCreditCardModal(false)} />
      <UPIModal show={showUPIModal} onHide={() => setShowUPIModal(false)} />
      <CashOnDeliveryModal show={showCODModal} onHide={() => setShowCODModal(false)} />

    </div>
  );
};

export default CheckoutPage;
