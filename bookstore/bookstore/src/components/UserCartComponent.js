import React, { useState } from 'react';
import { useCart } from '../CartModule/CartContext';
import './UserCartComponent.css'; 
import { useNavigate } from 'react-router-dom';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';

function UserCartComponent() {
  const {
    cartCourses = [], 
    deleteCourseFromCart,
    totalAmountCalculation,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode === 'BOOKNOOK18') {
      setDiscount(totalAmountCalculation() * 0.10);
    } else {
      setDiscount(0);
    }
  };

  const finalAmount = totalAmountCalculation() - discount;

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (cartCourses.length > 0 && finalAmount > 0) {
      navigate('/checkout'); 
    }
  };

  const handleBackToCategories = () => {
    navigate('/categories');
  };

  return (
    <div>
      <NavbarComp />
      <div className="shopping-cart-container mt-5 mb-5">
        <button className="back-to-categories" onClick={handleBackToCategories}>
          BACK TO SHOP
        </button>
        <h2 className='text-center'>SHOPPING CART({cartCourses.length})</h2>
        {cartCourses.length === 0 ? (
          <p className="empty-cart text-center"> your cart is empty.</p>
        ) : (
          <div className="cart-content">
            <table className="cart-table">
              <thead style={{backgroundColor: '#122c6f', color: '#fff'}}>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {cartCourses.map((item) => (
                  <tr key={item.product.id}>
                    <td className="product-info">
                      <img src={item.product.image} alt={item.product.name} />
                      <div className="product-details">
                        <h3>{item.product.name}</h3>
                      </div>
                    </td>
                    <td>₹{item.product.newPrice}</td>
                    <td>
                      <button
                          className="remove-button"
                          style={{color: 'red'}}
                          onClick={() => deleteCourseFromCart(item.product)}
                        >
                          X
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-sidebar">
              <div className="cart-totals">
                <h3>CART TOTALS</h3>
                <p className="total-amount">Subtotal: ₹{totalAmountCalculation()}</p>
                <div className="coupon-section">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="coupon-input"
                  />
                  <button className="apply-coupon-button" onClick={handleApplyCoupon}>
                    Apply Coupon
                  </button>
                  {discount > 0 && (
                    <p className="discount-info">Discount Applied: ₹{discount}</p>
                  )}
                </div>
                <p className="grand-total">Total: ₹{finalAmount}</p>
                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={cartCourses.length === 0 || finalAmount === 0}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterComp />
    </div>
  );
}

export default UserCartComponent;
