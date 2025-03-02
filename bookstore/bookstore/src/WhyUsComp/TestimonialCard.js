// TestimonialCard.js
import React from 'react';
import './whyus.css';

const TestimonialCard = () => {
  return (
    <div className="testimonial-container">
      <div className="image-section">
        <img src="https://img.freepik.com/free-photo/fun-3d-cartoon-baroque-gentleman_183364-120328.jpg?uid=R139172721&ga=GA1.1.1157361663.1710595436&semt=ais_user" alt="bookio" className="bookio-image" />
      </div>
      <div className="testimonial-section">
        <h1 className="quote-icon">“</h1>
        <p className="rating-whyus">
            ⭐⭐⭐⭐☆ 
        </p>
        <h3 className="testimonial-title">Great quality!</h3>
        <p className="testimonial-text">
          Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep screen
          violence joints symptoms x-ray yawn. Contagious cough diabetes mellitus...
        </p>
        <div className="user-info">
          <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2020/06/tes-1.jpg.webp" alt="user" className="user-image" />
          <div className="user-details">
            <h4 className="user-name">SHETTY JAMIE</h4>
            <p className="user-role">Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
