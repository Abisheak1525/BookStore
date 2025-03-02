
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './ProfilePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import NavbarComp from '../Navbar/NavbarComp'
import FooterComp from '../Footer/FooterComp'

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    profilePic: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
  });
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    originalPrice: '',
    resellingPrice: '',
    yearsUsed: '',
    edition: '',
    images: [],
    video: null,
    category: ''
  });
  const [booksAdded, setBooksAdded] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        try {
          const response = await fetch(`http://localhost:9001/profile?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            const errorData = await response.json();
            console.error('Error fetching user data:', errorData.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        navigate('/login');
      }
    };
    
    fetchUserData();
  }, [navigate]);

  
  useEffect(() => {
    if (location.pathname === '/profile/book') {
      setActiveTab('addBook');
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleBookInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setBookData({ ...bookData, images: [...bookData.images, ...files] });
    } else if (name === 'video') {
      setBookData({ ...bookData, video: files[0] });
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };
  

  const handleUpdateClick = async () => {
    if (isEditing) {
        try {
            const response = await fetch('http://localhost:9001/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                console.log('User data updated:', data);
                setSuccessMessage('Profile updated successfully!');
            } else {
                console.error('Update failed:', data.message);
                setError('Update failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    }
    setIsEditing(!isEditing);
};


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({ ...userData, profilePic: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const isProfileComplete = () => {
    const { firstName, lastName, phoneNo, city, state, pincode, country } = userData;
    return firstName && lastName && phoneNo && city && state && pincode && country;
  };

  const handleTabChange = (tab) => {
    if (tab === 'addBook' && !isProfileComplete()) {
      setError('Please complete your profile details before adding a book.');
      setSuccessMessage('');
    } else {
      setError('');
      setActiveTab(tab);
    }
  };

  const handleSellClick = async () => {
    if (!bookData.title || !bookData.author || !bookData.originalPrice || !bookData.resellingPrice || !bookData.yearsUsed || !bookData.edition || bookData.images.length === 0 || !bookData.video || !bookData.author || !bookData.category) {
      setError('Please fill all fields and upload an image and a video.');
      setSuccessMessage('');
      return;
    } else {
      setError('');
  
      const formData = new FormData();
      formData.append('title', bookData.title);
      formData.append('author', bookData.author);
      formData.append('originalPrice', bookData.originalPrice);
      formData.append('resellingPrice', bookData.resellingPrice);
      formData.append('yearsUsed', bookData.yearsUsed);
      formData.append('edition', bookData.edition);
      formData.append('auction', bookData.auction);
      formData.append('category', bookData.category);
      formData.append('user_id', userData.userId);
  
      bookData.images.forEach((image) => {
        formData.append('images', image);
      });
  
      if (bookData.video) {
        formData.append('video', bookData.video);
      }
  
      try {
        const response = await fetch('http://localhost:9001/profile/book', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const newBook = await response.json();
          localStorage.setItem('addedBookId', newBook.book_id);
          setBooksAdded([...booksAdded, newBook]);
          setBookData({
            title: '',
            author: '',
            originalPrice: '',
            resellingPrice: '',
            yearsUsed: '',
            edition: '',
            images: [],
            video: null,
            auction: '',
            category: ''
          });
          setSuccessMessage('Book added successfully!');
          setError('')
        } else {
          const errorData = await response.json();
          console.error('Error adding book:', errorData.message);
          setError('Error adding book. Please try again.');
          setSuccessMessage('')
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error adding book. Please try again.');
        setSuccessMessage('')
      }
    }
  };
  
  
  


  const removeBook = (index) => {
    const newBooks = booksAdded.filter((_, i) => i !== index);
    setBooksAdded(newBooks);
  };

  const removeImage = (index) => {
    const newImages = bookData.images.filter((_, i) => i !== index);
    setBookData({ ...bookData, images: newImages });
  };

  const removeVideo = () => {
    setBookData({ ...bookData, video: null });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };

  return (
    <div >
      <NavbarComp />
      <div className="profile-page mt-5 mb-5">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-pic-container">
              <div className="circle">
                <img className="profile-pic" src={userData.profilePic} alt="Profile" />
                <div className="p-image">
                  <FontAwesomeIcon icon={faCamera} className="upload-button" onClick={() => document.querySelector('.profile-pic-upload').click()} />
                  <input className="profile-pic-upload" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>
            </div>
            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
            <p>{userData.email}</p>
            <p>Books Reborned by you: {booksAdded.length} </p>
            <p>Books Reborned for you: 2</p>
            <button className="btn-logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
          <div className="profile-details">
            <div className="tabs">
              <button className={`tab ${activeTab === 'account' ? 'active' : ''}`} onClick={() => handleTabChange('account')}>Account Settings</button>
              <Link to="book">
                <button className={`tab ${activeTab === 'addBook' ? 'active' : ''}`} onClick={() => handleTabChange('addBook')}>Add a Book</button>
              </Link>
              <Link to="details">
                <button className={`tab ${activeTab === 'booksAdded' ? 'active' : ''}`} onClick={() => handleTabChange('booksAdded')}>Books Added</button>
              </Link>
            </div>
            <div className={`tab-content ${activeTab === 'account' ? 'active' : ''}`}>
              <h2>Account Settings</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={userData.phoneNo}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>State/County</label>
                  <input
                    type="text"
                    name="state"
                    value={userData.state}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Postcode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={userData.pincode}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={userData.country}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                {error && <div className='error-message'>{error}</div>}
                {successMessage && <div className='success-message'>{successMessage}</div>}
                <button className="btn-update" onClick={handleUpdateClick}>
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
            </div>
            {activeTab === 'addBook' && (
              <>
              <h2 className='text-white'>Add a Book</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Original Price</label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={bookData.originalPrice}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Reselling Price</label>
                  <input
                    type="text"
                    name="resellingPrice"
                    value={bookData.resellingPrice}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Years Used</label>
                  <input
                    type="text"
                    name="yearsUsed"
                    value={bookData.yearsUsed}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Edition</label>
                  <input
                    type="text"
                    name="edition"
                    value={bookData.edition}
                    onChange={handleBookInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <div className="file-upload" onClick={() => document.querySelector('.book-images-upload').click()}>
                    <FontAwesomeIcon icon={faPlus} className="file-upload-button" /> Add Images
                    <input className="book-images-upload" type="file" name="images" accept="image/*" multiple onChange={handleBookInputChange} />
                  </div>
                  <div className="image-preview">
                    {Array.from(bookData.images).map((image, index) => (
                      <div key={index} className="image-container">
                        <img src={URL.createObjectURL(image)} alt={`Book Image ${index + 1}`} />
                        <button onClick={() => removeImage(index)}>
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Video</label>
                  <div className="file-upload" onClick={() => document.querySelector('.book-video-upload').click()}>
                    <FontAwesomeIcon icon={faPlus} className="file-upload-button" /> Add Video
                    <input className="book-video-upload" type="file" name="video" accept="video/*" onChange={handleBookInputChange} />
                  </div>
                  {bookData.video && (
                    <div className="video-preview">
                      <video controls src={URL.createObjectURL(bookData.video)} />
                      <button onClick={removeVideo}>
                        X
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Required Auction</label>
                  <select
                    name="auction"
                    value={bookData.auction}
                    onChange={handleBookInputChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={bookData.category}
                    onChange={handleBookInputChange}
                  />
                </div>
                {error && <div className="popup error">{error}</div>}
                {successMessage && <div className="popup success">{successMessage}</div>}
                <button className="btn-update" onClick={handleSellClick}>
                  Sell
                </button>
              </div>
              </>
            )}
            <div className={`tab-content ${activeTab === 'booksAdded' ? 'active' : ''}`}>
            <h2 className='text-white'>Books Added</h2>
            <div className="books-added-list">
              {booksAdded.length > 0 ? (
                booksAdded.map((book, index) => (
                  <div key={index} className="book-item">
                    <div className="book-header">
                      <h3> {index % 2 === 0 ? 'Yet to Reborn' : 'Reborned'}</h3>
                      <p>Date: {new Date().toLocaleDateString()}</p>
                      <button className="btn-remove" onClick={() => removeBook(index)}>Remove</button>
                    </div>
                    <div className="book-content-added">
                      <div className="row">
                        <div className="column column-margin">
                          <h3 style={{ fontSize: "20px", fontWeight: 'bolder', color: 'black' }}>Address</h3>
                          <p>{userData.city}, {userData.state}, {userData.pincode}, {userData.country}</p>
                        </div>
                        <div className="column">
                          <h3 style={{ fontSize: "20px", fontWeight: 'bolder', color: 'black' }}>Book Details</h3>
                          <p>Title: {book.title || 'N/A'}</p>
                          <p>Author: {book.author || 'N/A'}</p>
                          <p>Price: ₹{book.resellingPrice || 'N/A'}</p>
                          <p>Auction: {book.auction || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="column">
                          <h3 style={{ fontSize: "20px", fontWeight: 'bolder', color: 'black' }}>Images</h3>
                          {book.images && book.images.length > 0 ? (
                            book.images.map((image, idx) => (
                              <img key={idx} src={URL.createObjectURL(image)} alt={`Book Image ${idx + 1}`} />
                            ))
                          ) : (
                            <p>No images available.</p>
                          )}
                        </div>
                        <div className="column">
                          {book.images && book.images.length > 1 && (
                            <>
                              <h3 style={{ fontSize: "20px", fontWeight: 'bolder', color: 'black' }}>More Images</h3>
                              {book.images.slice(1).map((image, idx) => (
                                <img key={idx} src={URL.createObjectURL(image)} alt={`Book Image ${idx + 2}`} />
                              ))}
                            </>
                          )}
                        </div>
                        <div className="column">
                          <h3 style={{ fontSize: "20px", fontWeight: 'bolder', color: 'black' }}>Video</h3>
                          {book.video ? (
                            <video controls>
                              <source src={URL.createObjectURL(book.video)} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <p>No video available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books added yet.</p>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default ProfilePage;

