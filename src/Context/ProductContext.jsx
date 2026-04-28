"use client"
import React, { createContext, useState, useEffect, useReducer } from 'react'
export const Context = createContext();

function ProductContext({ children }) {
  const [cartItem, setCartItem] = useState([]);
  const [whishlist, setWhishList] = useState([]);

  //The below useEffect is used to fill the wishlist

  useEffect(() => {
    const whishlistData = JSON.parse(localStorage.getItem("Whishlist")) || [];
    setWhishList(whishlistData);
  }, []);

  //The below useEffect is used to getData on first render for add to Cart
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("ProductInfo")) || [];
    setCartItem(storedData);
  }, []);
  //Whishlist functionality 

  const addToWhislisht = (item) => {
    const store = JSON.parse(localStorage.getItem("Whishlist")) || [];
    store.push(item);
    localStorage.setItem("Whishlist", JSON.stringify(store));
    setWhishList(store);
  }
  const removeWhislistItem = (id) => {
    const stored = JSON.parse(localStorage.getItem("Whishlist")) || [];
    const update = stored.filter((product) => product._id !== id);
    localStorage.setItem("Whishlist", JSON.stringify(update));
    setWhishList(update);
  }
  const isInWhishlist = (id) => {
    return whishlist.some((product) => product._id === id);
  }

  //Add to cart functionality
  const addToCart = (item) => {
    const store = JSON.parse(localStorage.getItem("ProductInfo")) || [];
    store.push(item);
    localStorage.setItem("ProductInfo", JSON.stringify(store));
    setCartItem(store);
  }
  const removeCart = (item) => {
    const storeItem = JSON.parse(localStorage.getItem("ProductInfo"));
    const update = storeItem.filter((product) => product._id !== item._id);
    localStorage.setItem("ProductInfo", JSON.stringify(update));
    setCartItem(update);
  }
  const isInCart = (id) => { 
    return cartItem.some((product) => product._id === id);
  }
  const TotalPrice = () => {
    return cartItem.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }
  return (
    <Context.Provider value={{  addToCart, cartItem,setCartItem, isInCart, removeCart, TotalPrice, addToWhislisht, isInWhishlist, whishlist, removeWhislistItem}}>
      {children}
    </Context.Provider>
  )
}

export default ProductContext