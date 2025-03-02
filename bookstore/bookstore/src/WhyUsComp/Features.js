
import React, {useEffect} from 'react';
import './whyus.css';

const Features = () => {
    useEffect(() => {
        const features = document.querySelectorAll('.feature-card');
        features.forEach((feature, index) => {
          feature.style.animationDelay = `${index * 0.2}s`;
          feature.classList.add('fly-in');
        });
      }, []);

  return (
    <>
      <div className="features-container">
        <div className="feature-card">
          <div className="icon">📦</div>
          <h3 className="feature-title">Free delivery</h3>
          <p className="feature-text">For all orders</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3 className="feature-title">Secure payments</h3>
          <p className="feature-text">Confidence on all your devices</p>
        </div>
        <div className="feature-card">
          <div className="icon">🎧</div>
          <h3 className="feature-title">Top-notch support</h3>
          <p className="feature-text">booknook@gmail.com</p>
        </div>
        <div className="feature-card">
          <div className="icon">↩️</div>
          <h3 className="feature-title">180 Days Return</h3>
          <p className="feature-text">180 Days Return</p>
        </div>
      </div>
      <div className="subscription-section">
        <h2 className="subscription-title">Our top books, exclusive content and competitions. Straight to your inbox.</h2>
        <form className="subscription-form">
          <input type="email" className="email-input" placeholder="Your email address..." />
          <button type="submit" className="subscribe-button">SUBSCRIBE</button>
        </form>
        <p>
          By clicking subscribe, I acknowledge that I have read and agree to BookNook’s <a href="/" style={{ textDecoration: 'underline' }}>Terms of Use and Privacy Policy</a>.
        </p>
      </div>
    </>
  );
};

export default Features;
