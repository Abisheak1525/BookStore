import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './BookDetail.css';
import AdminSidebar from '../AdminModule/AdminSidebar';

const BookCard = ({ images, title, author, originalPrice, resellingPrice, onClick }) => {
    return (
        <div className="book-card" onClick={onClick}>
            <div className="book-image">
                <img 
                    src={`data:image/jpeg;base64,${images[0]}`}
                    //src={images && images[0] ? `data:image/jpeg;base64,${images[0]}` : '/placeholder.png'} 
                    alt={title} 
                    //onError={(e) => e.target.src = '/placeholder.png'}
                /> 
            </div>
            <div className="book-info">
                {originalPrice && <span className="old-price">₹{originalPrice}</span>}
                <span className="new-price">₹{resellingPrice}</span>
                <h3>{title}</h3>
                <p>By {author}</p>
            </div>
        </div>
    );
};

const BookDetail = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isVideoSelected, setIsVideoSelected] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const observer = useRef();

    useEffect(() => {
        fetch(`http://localhost:9001/book-details`)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error fetching book data:', error));
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        observer.current = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const cards = document.querySelectorAll('.book-card');
        cards.forEach((card) => observer.current.observe(card));

        return () => observer.current.disconnect();
    }, [books]);

    const handleCardClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
        setSelectedImage(book.images[0]);
        setIsVideoSelected(false);
    };

    const handleClose = () => setShowModal(false);

    const handleReborn = () => {
        alert(`The book "${selectedBook.title}" is reborn!`);
    };

    const handleDie = () => {
        if (selectedBook) {
            fetch(`http://localhost:9001/book-details/${selectedBook.book_id}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    alert(`The book "${selectedBook.title}" has no More...`);
                    setBooks(books.filter(book => book.book_id !== selectedBook.book_id));
                    setShowModal(false); 
                } else {
                    alert('Failed to delete the book.');
                }
            })
            .catch((error) => console.error('Error deleting book:', error));
        }
    };
    

    return (
        <div>
            <AdminSidebar />
            <div className='cards-container p-5'>
                {books.map((book) => (
                    <div
                        key={book.book_id}
                        className="card-link"
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleCardClick(book)}
                    >
                        <BookCard {...book} />
                    </div>
                ))}
            </div>

            {selectedBook && (
                <Modal show={showModal} onHide={handleClose} size="lg" className="custom-modal" style={{ marginTop: '80px' }}>
                    <Modal.Body>
                        <div className="book-detail-container book-detail">
                            <div className="book-detail-left">
                                <div className="book-detail-thumbnails">
                                    {selectedBook.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`data:image/jpeg;base64,${img}`}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="thumbnail-image book-image"
                                            onClick={() => {
                                                setSelectedImage(img);
                                                setIsVideoSelected(false);
                                            }}
                                        />
                                    ))}
                                    {selectedBook.video && (
                                        <video
                                            className="thumbnail-video"
                                            onClick={() => setIsVideoSelected(true)}
                                        >
                                            <source src={`data:video/mp4;base64,${selectedBook.video}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                                <div className="book-detail-main-view">
                                    {isVideoSelected ? (
                                        <video controls className="main-video">
                                            <source src={`data:video/mp4;base64,${selectedBook.video}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={`data:image/jpeg;base64,${selectedImage || selectedBook.images[0]}`} alt="Main view" className="main-image" />
                                    )}
                                </div>
                            </div>
                            <div className="book-detail-right book-info">
                                <h2>Title{selectedBook.title}</h2>
                                <p className="author">By {selectedBook.author}</p>
                                <p className="edition">Edition:{selectedBook.edition}</p>
                                <p className="years-used">Used for: {selectedBook.yearsUsed}</p>
                                {selectedBook.originalPrice && <p className="old-price">₹{selectedBook.originalPrice}</p>}
                                <p className="new-price">₹{selectedBook.resellingPrice}</p>
                                <p className="description">{selectedBook.description}</p>
                                <p className="categories">
                                    Category: {Array.isArray(selectedBook.category) ? selectedBook.category.join(', ') : selectedBook.category}
                                </p>
                                <Button
                                    style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
                                    onClick={handleReborn}
                                >
                                    Reborn
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff', marginLeft: '10px' }}
                                    onClick={handleDie}
                                >
                                    Die
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default BookDetail;
