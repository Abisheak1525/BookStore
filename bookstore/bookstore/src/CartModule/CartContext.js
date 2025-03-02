
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCourses, setCartCourses] = useState([]);

  const addToCart = (product) => {
    setCartCourses((prevCartCourses) => {
      const existingItem = prevCartCourses.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCartCourses.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartCourses, { product, quantity: 1 }];
      }
    });
  };

  const deleteCourseFromCart = (product) => {
    setCartCourses((prevCartCourses) =>
      prevCartCourses.filter((item) => item.product.id !== product.id)
    );
  };

  const totalAmountCalculation = () => {
    return cartCourses.reduce((total, item) => total + item.product.newPrice * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartCourses,
        addToCart,
        deleteCourseFromCart,
        totalAmountCalculation,
        setCartCourses,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
