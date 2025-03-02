import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartModule/CartContext';
import NavbarComp from '../Navbar/NavbarComp';
import FooterComp from '../Footer/FooterComp';
import './Bookdetail.css';

const books = [
  {
    id: '1',
    images: [
      'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-19-330x462.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0https://mixkit.co/free-stock-video/woman-sitting-reading-in-pajamas-4950/',
    title: 'Bulle & Pelle',
    author: 'SAVANNA WALKER',
    oldPrice: '190.00',
    newPrice: '160.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '2',
    images: [
      'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/22.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Mexican Gothic',
    author: 'SIVIA MORENO',
    oldPrice: '240.00',
    newPrice: '220.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '3',
    images: ['https://bookpress.themeperch.net/multi/wp-content/uploads/sites/2/2022/07/book-mockup3-600x794.png',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Winner',
    author: 'MARACOS TRISON',
    oldPrice: '280.00',
    newPrice: '240.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '4',
    images: ['https://bookpress.themeperch.net/single/wp-content/uploads/sites/3/2017/01/let-the-sunshine-book-1-600x814.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Let The Sun Shine',
    author: 'MESHO BUVAHR',
    oldPrice: '230.00',
    newPrice: '190.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '5',
    images: ['https://bookpress.themeperch.net/html/assets/images/index2/book-mockup7.png',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'From the Other Side',
    author: 'BROWN',
    oldPrice: '340.00',
    newPrice: '290.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '6',
    images: ['https://kodeforest.net/html/books/library/images/book4.png',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Monster Night',
    author: 'SI MODARSK',
    oldPrice: '250.00',
    newPrice: '90.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '7',
    images: ['http://subsolardesigns.com/leona/wp-content/uploads/2019/04/back_home1-600x900.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Back Home',
    author: 'JOHN CRAK',
    newPrice: '110.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '8',
    images: ['https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-11-330x462.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Assault',
    author: 'HARRY MODARSK',
    newPrice: '140.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '9',
    images: ['https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2018/05/Image-7-480x693.jpg.webp',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Healed',
    author: 'MANISHA KOIRALA',
    newPrice: '290.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '10',
    images: ['https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/11.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Illness lesson',
    author: 'CLARE BEAMS',
    newPrice: '200.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '11',
    images: ['https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/10.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Clap When You Land',
    author: 'ELIZABETH ACEVEDO',
    newPrice: '204.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '12',
    images: ['https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2018/05/Image-2.jpg.webp',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Art Of Fashion',
    author: 'BUVAHR',
    newPrice: '109.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '13',
    images: ['https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/6.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Im The Garden',
    author: 'FUGITIVES',
    newPrice: '250.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '14',
    images: ['https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-08-330x462.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Night Ocean',
    author: 'PAUL LA FARDE',
    newPrice: '190.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '15',
    images: ['https://arena-book-shop.myshopify.com/cdn/shop/products/1_1024x@2x.jpg?v=1571395238',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Big Magic',
    author: 'ELIZABETH GILBERT',
    newPrice: '301.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '16',
    images: ['https://arena-book-shop.myshopify.com/cdn/shop/products/21_d0788249-f398-4683-874c-f02c76fde114_1024x.jpg?v=1569379691',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Ten Thousand Skies Above You',
    author: 'GRAY',
    newPrice: '290.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '17',
    images: ['https://bookpress.themeperch.net/multi/wp-content/uploads/sites/2/2022/07/book-mockup1-600x795.png',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Dark In Mask',
    author: 'MESHO',
    newPrice: '307.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '18',
    images: ['https://bookpress.themeperch.net/single/wp-content/uploads/sites/3/2017/01/book-1-500x679.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Seven Sisters',
    author: 'LUCINDA RILEY',
    newPrice: '190.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '19',
    images: ['http://subsolardesigns.com/leona/wp-content/uploads/2019/04/pink_clouds1-600x900.jpg',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'Pink Clouds',
    author: 'LUICE',
    newPrice: '109.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  },
  {
    id: '20',
    images: ['https://arena-book-shop.myshopify.com/cdn/shop/products/7_9fbff576-c9e9-4e66-97d9-41df460ec738_1024x.jpg?v=1571645141',
      'https://arena-book-shop.myshopify.com/cdn/shop/products/digital-media-shopify-theme_1024x1024_bf68f002-2263-41ab-a2c2-9ba6698c912f_1024x.jpg?v=1558942497'
    ],
    videos: 'https://haiper.ai/creation/66a5fce4325795b4358fd4a0.mp4',
    title: 'The Trials Of APOLLO',
    author: 'RICK',
    newPrice: '167.00',
    description:
      "Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!",
    categories: ['Action & Adventure', 'Cultural'],
    tags: ['Books', 'Fiction', 'Romance'],
    edition: 'First Edition',
    yearsUsed: '2 years',
  }
];

const relatedBooks = [
  {
    id: '32',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-1.jpg',
    title: 'The Winter',
    newPrice: '120.00',
  },
  {
    id: '33',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-5.jpg',
    title: 'Enlight Yourself',
    newPrice: '140.00',
  },
  {
    id: '34',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-8.jpg',
    title: 'Bangladesh Power',
    newPrice: '100.00',
  },
  {
    id: '35',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-7.jpg',
    title: 'Time Travel',
    newPrice: '240.00',
  },
  {
    id: '36',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-10.jpg',
    title: 'Grow Flower',
    newPrice: '140.00',
  },
  {
    id: '37',
    image: 'https://htmldemo.net/pustok/pustok/image/products/product-9.jpg',
    title: 'Supper High',
    newPrice: '140.00',
  },

];

const Bookdetail = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState('');
  const [isVideoSelected, setIsVideoSelected] = useState(false);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleAddToCart = () => {
    const product = {
      id: book.id,
      image: selectedImage || book.images[0], 
      name: book.title,
      newPrice: book.newPrice,
    };
    addToCart(product);
    alert(`${book.title} added to cart!`);
  };

  return (
    <div>
      <NavbarComp />
      <div className="book-detail-container book-detail">
        <div className="book-detail-left">
          <div className="book-detail-thumbnails">
            {book.images.map((img, index) => (
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
            <video
              className="thumbnail-video"
              onClick={() => {
                setIsVideoSelected(true);
              }}
            >
              <source src={book.videos} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="book-detail-main-view">
            {isVideoSelected ? (
              <video controls className="main-video">
                <source src={book.videos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedImage || book.images[0]} alt="Main view" className="main-image" />
            )}
          </div>
        </div>
        <div className="book-detail-right book-info">
          <h2>{book.title}</h2>
          <p className="author">By {book.author}</p>
          <p className="edition">{book.edition}</p>
          <p className="years-used">Used for: {book.yearsUsed}</p>
          {book.oldPrice && <p className="old-price">₹{book.oldPrice}</p>}
          <p className="new-price">₹{book.newPrice}</p>
          <p className="rating">
            ⭐⭐⭐⭐☆ 
          </p>
          <p className="description">{book.description}</p>
          <p className="categories">
            Categories: {book.categories.join(', ')}
          </p>
          <p className="tags">Tags: {book.tags.join(', ')}</p>
          <div className="actions">
            <button className="add-to-cart" onClick={handleAddToCart}> Add To Cart</button>
          </div>
        </div>
      </div>
      <div className="recently-viewed-container">
        <h3 className='text-center' style={{fontWeight: '600'}}>Related Products</h3>
        <CardCarousel />
      </div>
      <FooterComp />
    </div>
  );
};

const CardCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;

  const handleRightArrowClick = () => {
    if (startIndex + visibleCards < relatedBooks.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleLeftArrowClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <button
        onClick={handleLeftArrowClick}
        disabled={startIndex === 0}
        className="arrow-button"
      >
        &lt;
      </button>

      <div className="cards">
        {relatedBooks.slice(startIndex, startIndex + visibleCards).map((book) => (
          <div key={book.id} className="card-product">
            <img src={book.image} alt={book.title} />
            <p>{book.title}</p>
            <p>₹{book.newPrice}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleRightArrowClick}
        disabled={startIndex + visibleCards >= relatedBooks.length}
        className="arrow-button"
      >
        &gt;
      </button>
    </div>
  );
};

export default Bookdetail;
