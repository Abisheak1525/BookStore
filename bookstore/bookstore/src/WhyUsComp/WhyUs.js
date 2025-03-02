// WhyUs.js
import React, { useEffect, useRef } from 'react';
import './whyus.css';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';
import Features from './Features';
import TestimonialCard from './TestimonialCard';

const WhyUs = () => {
  const bookstoreRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.book').forEach((el) => {
              el.classList.add('jump-up');
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (bookstoreRef.current) {
      observer.observe(bookstoreRef.current);
    }

    return () => {
      if (bookstoreRef.current) {
        observer.unobserve(bookstoreRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.feature-card').forEach((el, index) => {
              el.style.animationDelay = `${index * 0.2}s`;
              el.classList.add('fly-in');
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div>
      <NavbarComp />
      <div className="bookstore-section">
        <div className="image-container">
          <video className="bookstore-image" autoPlay loop muted>
            <source src="https://assets.mixkit.co/videos/4952/4952-720.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="content">
          <h2>BUSINESS FOR GOOD</h2>
          <h1>BookNook is India's Online Independent Bookstore.</h1>
          <p>Give Books a second life...</p>
          <hr />
          <p>
            BookNook is a cozy online haven for book lovers, offering a vast selection of new and used books. Dedicated to fostering a love for reading, BookNook curates collections for every taste, from bestsellers to hidden gems. With a focus on sustainability, the platform promotes book reusability and eco-friendly practices. Readers can enjoy personalized recommendations and engaging community features. Discover your next great read at BookNook, where every book finds its perfect nook.
          </p>
        </div>
      </div>
      <div ref={featuresRef}>
        <Features />
      </div>
      <div className="bookstore" ref={bookstoreRef}>
        <div className="books mb-5">
          <img src='https://arena-book-shop.myshopify.com/cdn/shop/products/19_180x.jpg?v=1557991467' alt="Book 1" className="book book1" />
          <img src='https://arena-book-shop.myshopify.com/cdn/shop/products/pro_pbid_20223_180x.jpg?v=1571646169' alt="Book 2" className="book book2" />
          <img src='https://arena-book-shop.myshopify.com/cdn/shop/products/14_180x.jpg?v=1571645290' alt="Book 3" className="book book3" />
        </div>
        <div className="book-content mt-5">
          <hr />
          <h1>The Internet's Largest Bookstore</h1>
          <p>Get behind the scenes with us and explore the re-use revolution</p>
        </div>
      </div>
      <TestimonialCard />
      <FooterComp />
    </div>
  );
};

export default WhyUs;
