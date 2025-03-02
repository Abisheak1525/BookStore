import React, { useState, useEffect, useRef } from 'react';
import './Categories.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';

const BookCard = ({ image, title, author, oldPrice, newPrice, isSale, isHot }) => {
    return (
        <div className="book-card">
            <div className="book-image">
                <img src={image} alt={title} />
                {isSale && <div className="tag sale">SALE</div>}
                {isHot && <div className="tag hot">HOT</div>}
                <div className="hover-icons">
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faSearch} />
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
            </div>
            <div className="book-info">
                {oldPrice && <span className="old-price">₹{oldPrice}</span>}
                <span className="new-price">₹{newPrice}</span>
                <h3>{title}</h3>
                <p>By {author}</p>
            </div>
        </div>
    );
};

const Categories = () => {
    const location = useLocation();
    const [filteredBooks, setFilteredBooks] = useState([]);

    const books = [
        {
            id: '1',
            image: 'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-19-330x462.jpg',
            title: 'Bulle & Pelle',
            author: 'SAVANNA WALKER',
            oldPrice: '190.00',
            newPrice: '160.00',
            isSale: true,
            isHot: true,
        },
        {
            id: '2',
            image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/22.jpg',
            title: 'Mexican Gothic',
            author: 'SIVIA MORENO',
            oldPrice: '240.00',
            newPrice: '220.00',
            isSale: true,
            isHot: true,
        },
        {
            id: '3',
            image: 'https://bookpress.themeperch.net/multi/wp-content/uploads/sites/2/2022/07/book-mockup3-600x794.png',
            title: 'The Winner',
            author: 'MARACOS TRISON',
            newPrice: '240.00',
        },
        {
            id: '4',
            image: 'https://bookpress.themeperch.net/single/wp-content/uploads/sites/3/2017/01/let-the-sunshine-book-1-600x814.jpg',
            title: 'Let The Sun Shine',
            author: 'MESHO BUVAHR',
            newPrice: '190.00',
        },
        {
            id: '5',
            image: 'https://bookpress.themeperch.net/html/assets/images/index2/book-mockup7.png',
            title: 'From the Other Side',
            author: 'BROWN',
            newPrice: '290.00',
        },
        {
            id: '6',
            image: 'https://kodeforest.net/html/books/library/images/book4.png',
            title: 'Monster Night',
            author: 'SI MODARSK',
            newPrice: '90.00',
        },
        {
            id: '7',
            image: 'http://subsolardesigns.com/leona/wp-content/uploads/2019/04/back_home1-600x900.jpg',
            title: 'Back Home',
            author: 'JOHN CRAK',
            newPrice: '110.00',
        },
        {
            id: '8',
            image: 'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-11-330x462.jpg',
            title: 'The Assault',
            author: 'HARRY MODARSK',
            newPrice: '140.00',
        },
        {
            id: '9',
            image: 'https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2018/05/Image-7-480x693.jpg.webp',
            title: 'Healed',
            author: 'MANISHA KOIRALA',
            newPrice: '290.00',
        },
        {
            id: '10',
            image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/11.jpg',
            title: 'Illness lesson',
            author: 'CLARE BEAMS',
            newPrice: '200.00',
        },
        {
            id: '11',
            image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/10.jpg',
            title: 'Clap When You Land',
            author: 'ELIZABETH ACEVEDO',
            newPrice: '204.00',
        },
        {
            id: '12',
            image: 'https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2018/05/Image-2.jpg.webp',
            title: 'The Art Of Fashion',
            author: 'BUVAHR',
            newPrice: '109.00',
        },
        {
            id: '13',
            image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/6.jpg',
            title: 'Im The Garden',
            author: 'FUGITIVES',
            newPrice: '250.00',
        },
        {
            id: '14',
            image: 'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-08-330x462.jpg',
            title: 'The Night Ocean',
            author: 'PAUL LA FARDE',
            newPrice: '190.00',
        },
        {
            id: '15',
            image: 'https://arena-book-shop.myshopify.com/cdn/shop/products/1_1024x@2x.jpg?v=1571395238',
            title: 'Big Magic',
            author: 'ELIZABETH GILBERT',
            newPrice: '301.00',
        },
        {
            id: '16',
            image: 'https://arena-book-shop.myshopify.com/cdn/shop/products/21_d0788249-f398-4683-874c-f02c76fde114_1024x.jpg?v=1569379691',
            title: 'Ten Thousand Skies Above You',
            author: 'GRAY',
            newPrice: '290.00',
        },
        {
            id: '17',
            image: 'https://bookpress.themeperch.net/multi/wp-content/uploads/sites/2/2022/07/book-mockup1-600x795.png',
            title: 'Dark In Mask',
            author: 'MESHO',
            newPrice: '307.00',
        },
        {
            id: '18',
            image: 'https://bookpress.themeperch.net/single/wp-content/uploads/sites/3/2017/01/book-1-500x679.jpg',
            title: 'The Seven Sisters',
            author: 'LUCINDA RILEY',
            newPrice: '190.00',
        },
        {
            id: '19',
            image: 'http://subsolardesigns.com/leona/wp-content/uploads/2019/04/pink_clouds1-600x900.jpg',
            title: 'Pink Clouds',
            author: 'LUICE',
            newPrice: '109.00',
        },
        {
            id: '20',
            image: 'https://arena-book-shop.myshopify.com/cdn/shop/products/7_9fbff576-c9e9-4e66-97d9-41df460ec738_1024x.jpg?v=1571645141',
            title: 'The Trials Of APOLLO',
            author: 'RICK',
            newPrice: '167.00',
        }
    ];

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');
        
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(lowercasedQuery) ||
                book.author.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);
        }
    }, [location.search, books]);


    const observer = useRef();

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
    }, []);

    return (
        <div className='categories-container'>
            <NavbarComp />
            <div className="app p-4">
                <div className="section top-left">
                    <img src="https://auteur.g5plus.net/main/wp-content/uploads/2018/11/single-image-14-260x202.png" alt="Find Books For All Ages" />
                    <div className="text-content">
                        <h1 style={{ fontWeight: 'bolder' }}>Find Books For All Ages</h1>
                        <p style={{ fontWeight: '100' }}>Discover a variety of books suitable for all ages.</p>
                    </div>
                </div>
                <div className="section top-middle">
                    <h1 className='text-white'>SUMMER SALE</h1>
                    <h1 style={{ color: 'GrayText', border: '2px' }}>40% OFF</h1>
                </div>
                <div className="section top-right">
                    <div className="background-image-1"></div>
                    <h2 style={{ color: 'black', marginTop: '160px' }}>Mind and soul</h2>
                    <p style={{ color: 'black' }}>Give soul and mind to a books.</p>
                </div>
                <div className="section middle-middle">
                    <div className="background-image-2"></div>
                    <h3 style={{ color: 'black', marginTop: '160px' }}>Book for Child Stars</h3>
                </div>
                <div className="section middle-left">
                    <img src="https://auteur.g5plus.net/main/wp-content/uploads/2018/11/slider-02-1.png" alt="Henry & the good dog" />
                    <div className="text-content">
                        <h1 className='text-white'>Henry & the good dog</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit sagittis leo sit amet condimentum.</p>
                    </div>
                </div>
                <div className="section middle-right">
                    <div className="background-image"></div>
                    <h1></h1>
                </div>
            </div>
            <div className='cards-container p-5'>
                {filteredBooks.map((book) => (
                    <Link
                        key={book.id}
                        to={`/book/${book.id}`}
                        className="card-link"
                        style={{ textDecoration: 'none' }}
                    >
                        <BookCard {...book} />
                    </Link>
                ))}
            </div>
            <FooterComp />
        </div>
    );
};

export default Categories;
