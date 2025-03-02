import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Auction.css';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';

const Auction = () => {
  const { id } = useParams();

  const auctionDetails = {
    1: {
      title: 'House of Sky and Breath',
      author: 'Ernesto Wade',
      price: '₹180.00',
      yearsUsed: 2,
      edition: '1st',
      minBid: '₹100.00',
      originalPrice: '₹120.00',
      images: [
        'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/31.jpg',
      ],
      video: 'https://assets.mixkit.co/videos/45772/45772-720.mp4',
    },
    2: {
      title: 'The Wretched of the Earth',
      author: 'Frantz Fanon',
      price: '₹1220.00',
      yearsUsed: 1,
      edition: '2nd',
      minBid: '₹100.00',
      originalPrice: '₹800.00',
      images: [
        'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/12.jpg',
      ],
      video: 'https://assets.mixkit.co/videos/45772/45772-720.mp4',
    },
    3: {
      title: 'His Saving Grace',
      author: 'Misty Figueroa',
      price: '₹240.00',
      yearsUsed: 1,
      edition: '2nd',
      minBid: '₹120.00',
      originalPrice: '₹180.00',
      images: [
        'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/24.jpg',
      ],
      video: 'https://assets.mixkit.co/videos/45772/45772-720.mp4',
    },
    4: {
      title: 'City of the Dead',
      author: 'Rita James',
      price: '₹740.00',
      yearsUsed: 1,
      edition: '2nd',
      minBid: '₹520.00',
      originalPrice: '₹780.00',
      images: [
        'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/23.jpg',
      ],
      video: 'https://assets.mixkit.co/videos/45772/45772-720.mp4',
    },
  };

  const auction = auctionDetails[id] || {};
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');
  const [topBidder, setTopBidder] = useState(null);
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [selectedImage, setSelectedImage] = useState(auction.images?.[0] || '');
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 1); // Set auction end time to 1 hour from now

    const updateTimer = () => {
      const now = new Date();
      const timeDifference = endTime - now;

      if (timeDifference > 0) {
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimer({ hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimer({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [id]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const newBidValue = parseFloat(newBid.replace('₹', '').replace(',', ''));
    const topBidValue = parseFloat(topBidder ? topBidder.replace('₹', '').replace(',', '') : auction.minBid.replace('₹', '').replace(',', ''));

    if (newBidValue <= topBidValue) {
      setErrorMessage('Bid a higher amount to win!!');
    } else {
      const now = new Date();
      const bidTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      setBids([...bids, { amount: `₹${newBidValue.toFixed(2)}`, user_name: 'User Name', profile_pic: 'https://via.placeholder.com/150/0000FF/808080?text=User', time: bidTime }]);
      setTopBidder(`₹${newBidValue.toFixed(2)}`);
      setNewBid('');
      setErrorMessage('');
    }
  };

  return (
    <div>
      <NavbarComp />
      <div className="auction-container">
        <h1>{auction.title || 'Auction Item'}</h1>
        {topBidder && <div className="top-bidder">Top Bidder: {topBidder}</div>}
        <div className="auction-timer">
          {timer.hours}:{timer.minutes.toString().padStart(2, '0')}:
          {timer.seconds.toString().padStart(2, '0')}
        </div>
        <div className="auction-content">
          <div className="auction-details">
            <div className="book-detail-left">
              <div className="book-detail-thumbnails">
                {auction.images && auction.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail-image book-image"
                    onClick={() => {
                      setSelectedImage(img);
                      setIsVideoSelected(false);
                    }}
                  />
                ))}
                {auction.video && (
                  <video
                    className="thumbnail-video"
                    onClick={() => setIsVideoSelected(true)}
                  >
                    <source src={auction.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="book-detail-main-view">
                {isVideoSelected ? (
                  <video controls className="main-video">
                    <source src={auction.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={selectedImage} alt="Main view" className="main-image" />
                )}
              </div>
            </div>
            <h3 className="mt-2">by {auction.author}</h3>
            <p>Years Used: {auction.yearsUsed}</p>
            <p>Edition: {auction.edition}</p>
            <p>Minimum Bid: {auction.minBid}</p>
            <p>Original Price: {auction.originalPrice}</p>
          </div>
          <div className="bidding-box">
            <div className="chat-box">
              {bids.map((bid, index) => (
                <div key={index} className={`bid-message ${index % 2 === 0 ? 'user' : 'other'}`}>
                  <div className="message-content">{bid.amount}</div>
                  <div className="profile-header d-flex flex-column">
                    <img src={index % 2 === 0 ? 'https://img.freepik.com/free-vector/hand-drawn-finger-heart-style_23-2148612872.jpg?t=st=1722789477~exp=1722793077~hmac=e599423e7b848e614e4146baff485efa558d3ceb54f1028b3c41d9f6680ab70a&w=740' : 'https://img.freepik.com/free-vector/k-pop-music-concept_23-2148624244.jpg?t=st=1722789314~exp=1722792914~hmac=4b7132d3aecb493c13b3e3800d25078210b97c73395b18a559d5d098fa14957b&w=740'} alt="Profile" className="profile-pic-auction" />
                    <div className="user-info d-flex flex-column mt-0">
                      <span className="message-time">{bid.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleBidSubmit} className="message-form">
              <input
                type="text"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                placeholder="Enter your bid"
                required
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <button type="submit">Submit Bid</button>
            </form>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Auction;
