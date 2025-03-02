import React, { useState, useEffect } from 'react';
import './landing.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarComp from '../Navbar/NavbarComp';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import FooterComp from '../Footer/FooterComp';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [showCounts, setShowCounts] = useState(false);
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });


  const handleScroll = () => {
    const element = document.querySelector('.high-selling-book-h1');
    const countContainer = document.querySelector('.count-container');
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        element.classList.add('visible');
      }
    }
    if (countContainer) {
      const countRect = countContainer.getBoundingClientRect();
      if (countRect.top >= 0 && countRect.bottom <= window.innerHeight) {
        countContainer.classList.add('visible');
        setShowCounts(true);
      }
    }
  };

  const animateCount = (id, endValue) => {
    let startValue = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / endValue));
    const element = document.getElementById(id);
    const timer = setInterval(() => {
      startValue += 1;
      element.textContent = startValue;
      if (startValue === endValue) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showCounts) {
      animateCount('working-year', 210);
      animateCount('books-sold', 589);
      animateCount('top-author', 358);
    }
  }, [showCounts]);

  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 30);
  
    const updateTimer = () => {
      const now = new Date();
      const timeDifference = endTime - now;
  
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
        setTimer({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
  
    const interval = setInterval(updateTimer, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  const blogPosts = [
    {
      title: 'How to Find the Perfect Used Book',
      author: 'Jane Smith',
      date: 'July 20, 2024',
      excerpt: 'Discover tips and tricks for finding hidden gems among used books. From knowing where to look to understanding book conditions, our guide will help you become a savvy used book shopper.',
      image: 'https://uiparadox.co.uk/templates/book_store/v2/assets/media/blogs/blog-3.png',
    },
    {
      title: 'The Benefits of Reading Physical Books',
      author: 'John Doe',
      date: 'July 18, 2024',
      excerpt: 'In an age of digital media, physical books still hold a special place. Learn about the benefits of reading physical books and why they remain popular among readers of all ages.',
      image: 'https://uiparadox.co.uk/templates/book_store/v2/assets/media/blogs/blog-1.png',
    },
    {
      title: 'How to Sell Your Used Books Online',
      author: 'Alice Johnson',
      date: 'July 15, 2024',
      excerpt: 'Selling used books online can be a great way to declutter and make some extra cash. Follow our step-by-step guide to successfully sell your used books online and reach a wider audience.',
      image: 'https://uiparadox.co.uk/templates/book_store/v2/assets/media/blogs/blog-2.png',
    },
  ];

  return (
    <div>
      <NavbarComp />
      <div className='video-container'>
        <video className="background-video" autoPlay loop muted>
          <source src="https://assets.mixkit.co/videos/21587/21587-720.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='video-content'>
          <h1 className='fade-in video-welcome'>Welcome to</h1>
          <h1 className='fade-in video-name'><span style={{ color: '#122c6f' }}>BookNook</span> - Give Books a Second Life</h1>
          <p className='fade-in video-welcome'> Each book has been carefully handled and is ready for a new home. Explore a variety of genres and find great reads at affordable prices. Happy reading!</p>
          <a href="/profile" className="fade-in link-button">
            Dive In <span className="arrow">→</span>
          </a>
        </div>
      </div>
      <div className='high-selling-book-h1'>
        <h1 className='' style={{ fontWeight: 'bolder' }}>In-Demand Books</h1>
        <div className='card-container d-flex flex-row justify-content-center'>
          <div className="card">
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/33.jpg" alt="Card Image" />
            <div className="overlay">
              <h2>Over the woodward</h2>
              <h5>A.Debrah Baker</h5>
            </div>
          </div>
          <div className="card">
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/29.jpg" alt="Card Image" />
            <div className="overlay">
              <h2>The Scapegracers</h2>
              <h5>Jessica Munoz</h5>
            </div>
          </div>
          <div className="card">
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/9.jpg" alt="Card Image" />
            <div className="overlay">
              <h2>Helium</h2>
              <h5>Author Gonzalez</h5>
            </div>
          </div>
          <div className="card">
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/26.jpg" alt="Card Image" />
            <div className="overlay">
              <h2>Memorial</h2>
              <h5>Bryan Washington</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="deals-container mt-3">
        <div className="deals-of-the-week">
          <div className='d-flex flex-row'>
            <h2 style={{ fontWeight: 'bolder' }}>Auction of the day</h2>
            <div className="deal-timer-container">
              <FontAwesomeIcon icon={faClock} className="clock-icon" />
              <div className="timer">
                {timer.days}:{timer.hours.toString().padStart(2, '0')}:
                {timer.minutes.toString().padStart(2, '0')}:
                {timer.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
          <div className="deals-card-container">
          <Link to="/auction/1" className="deals-card">
              <img
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/31.jpg"
                alt="House of Sky and Breath"
              />
              <div className="deals-card-content">
                <h3>House of Sky and Breath</h3>
                <div className="rating">⭐⭐⭐⭐☆ <span>4</span></div>
                <p>Ernesto Wade</p>
                <p className="deal-price">₹92.99 <span className="original-price">₹86.99</span></p>
              </div>
            </Link>
            <Link to="/auction/2" className="deals-card">
              <img
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/12.jpg"
                alt="Treachery: Alpha Colon..."
              />
              <div className="deals-card-content">
                <h3>Treachery: Alpha Colon...</h3>
                <div className="rating">⭐⭐⭐⭐☆ <span>4</span></div>
                <p>Jessica Munoz</p>
                <p className="deal-price">₹969.00 <span className="original-price">₹814.66</span></p>
              </div>
            </Link>
            <Link to="/auction/3" className="deals-card">
              <img
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/24.jpg"
                alt="His Saving Grace"
              />
              <div className="deals-card-content">
                <h3>His Saving Grace</h3>
                <div className="rating">⭐⭐⭐⭐⭐ <span>5</span></div>
                <p>Misty Figueroa</p>
                <p className="deal-price">₹301.00 <span className="original-price">₹288.74</span></p>
              </div>
            </Link>
            <Link to="/auction/4" className="deals-card">
              <img
                src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/23.jpg"
                alt="City of the Dead"
              />
              <div className="deals-card-content">
                <h3>City of the Dead</h3>
                <div className="rating">⭐⭐⭐☆☆ <span>3</span></div>
                <p>Rita James</p>
                <p className="deal-price">₹702.00 <span className="original-price">₹628.28</span></p>
              </div>
            </Link>
          </div>
        </div>
        <div className="top-selling-vendors">
          <h2 style={{ fontWeight: 'bolder' }}>Auction Winners</h2>
          <div className="vendor-list">
            <div className="vendor-card">
              <div className="vendor-rank">01.</div>
              <div className="vendor-info">
                <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2021/07/img3-1-1.jpg.webp" alt="Vendor Logo" />
                <div>
                  <h3>Stacey Halls</h3>
                  <p>The devil and Dark Water</p>
                  <div className="rating">₹760</div>
                </div>
              </div>
            </div>
            <div className="vendor-card">
              <div className="vendor-rank">02.</div>
              <div className="vendor-info">
                <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2020/06/tes-1.jpg.webp" alt="Vendor Logo" />
                <div>
                  <h3>Ann Smith</h3>
                  <p>Castle In The Sky</p>
                  <div className="rating">₹730</div>
                </div>
              </div>
            </div>
            <div className="vendor-card">
              <div className="vendor-rank">03.</div>
              <div className="vendor-info">
                <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2019/12/tes-2.jpg.webp" alt="Vendor Logo" />
                <div>
                  <h3>Saitama One</h3>
                  <p>The Art of Fashion</p>
                  <div className="rating">₹700</div>
                </div>
              </div>
            </div>
            <div className="vendor-card">
              <div className="vendor-rank">04.</div>
              <div className="vendor-info">
                <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2019/02/tes-3-1.jpg.webp" alt="Vendor Logo" />
                <div>
                  <h3>Sara Colinton</h3>
                  <p>100 Selected Poems</p>
                  <div className="rating">₹670</div>
                </div>
              </div>
            </div>
            <div className="vendor-card">
              <div className="vendor-rank">05.</div>
              <div className="vendor-info">
                <img src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2019/12/tes-1.jpg.webp" alt="Vendor Logo" />
                <div>
                  <h3>Shetty Jamie</h3>
                  <p>Brave Heart</p>
                  <div className="rating">₹660</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='count-container'>
        <div className='count-box'>
          <h2 id="working-year">0+</h2>
          <h5>USERS</h5>
        </div>
        <div className='count-box'>
          <h2 id="books-sold">0+</h2>
          <h5>BOOKS</h5>
        </div>
        <div className='count-box'>
          <h2 id="top-author">0+</h2>
          <h5>ORDERS</h5>
        </div>
      </div>
      <div className="blog-post-container">
        <div className='container mt-5'>
          <h2 className='mb-4 blog-header text-center'>Latest Blog Posts</h2>
          <div className='row-blog'>
            {blogPosts.map((post, index) => (
              <div className='col-md-4 mb-4 ml-2' key={index}>
                <div className='card blog-card ml-2'>
                  <img src={post.image} className='card-img-top' alt={post.title} />
                  <div className='card-body'>
                    <h5 className='card-title ' >{post.title}</h5>
                    <p className='card-text'>{post.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Landing;
