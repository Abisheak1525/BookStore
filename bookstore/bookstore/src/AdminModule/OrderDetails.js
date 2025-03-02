import React from 'react';
import './OrderDetails.css'; // Import your CSS for styling
import AdminSidebar from './AdminSidebar';

const OrderDetails = () => {
  // Sample data
  const orders = [
    {
      image: 'https://auteur.g5plus.net/main/wp-content/uploads/2018/11/product-19-330x462.jpg',
      bookName: 'Bulle & Pelle',
      buyerId: '012',
      sellerId: '123',
      buyerAddress: '123 Buyer St, City, Country',
      sellerAddress: '456 Seller Ave, City, Country',
      orderDate: '2024-07-29',
      deliveryDate: '2024-08-05',
      price: 290.99,
    },
    {
      image: 'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/22.jpg',
      bookName: 'Mexican Gothic',
      buyerId: '456',
      sellerId: '56',
      buyerAddress: '789 Buyer Blvd, City, Country',
      sellerAddress: '101 Seller Rd, City, Country',
      orderDate: '2024-07-30',
      deliveryDate: '2024-08-06',
      price: 390.99,
    },
    {
      image: 'https://bookpress.themeperch.net/multi/wp-content/uploads/sites/2/2022/07/book-mockup3-600x794.png',
      bookName: 'The Winner',
      buyerId: '46',
      sellerId: '556',
      buyerAddress: '789 Buyer Blvd, City, Country',
      sellerAddress: '101 Seller Rd, City, Country',
      orderDate: '2024-07-30',
      deliveryDate: '2024-08-06',
      price: 340.99,
    },
    {
      image: 'https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2018/05/Image-2.jpg.webp',
      bookName: 'The Art Of Fashion',
      buyerId: '456',
      sellerId: '56',
      buyerAddress: '789 Buyer Blvd, City, Country',
      sellerAddress: '101 Seller Rd, City, Country',
      orderDate: '2024-07-30',
      deliveryDate: '2024-08-06',
      price: 900.99,
    },
  ];

  return (
    <div className="order-details">
      <AdminSidebar />
      <div className="content">
        <div className="card-container">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <img src={order.image} alt={order.bookName} className="order-image" />
              <div className="order-info">
                <h3>{order.bookName}</h3>
                <p><strong>Buyer ID:</strong> {order.buyerId}</p>
                <p><strong>Seller ID:</strong> {order.sellerId}</p>
                <p><strong>Buyer Address:</strong> {order.buyerAddress}</p>
                <p><strong>Seller Address:</strong> {order.sellerAddress}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
