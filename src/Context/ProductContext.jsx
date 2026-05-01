"use client"
import api from '@/app/api/axios';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useEffect, useReducer } from 'react'
export const Context = createContext();

function ProductContext({ children }) {
  const [cartItem, setCartItem] = useState([]);
  const [whishlist, setWhishList] = useState([]);
   const [user,setUser] = useState({});
     const [isUserPresent,setIsUserPresent] = useState(false)
const pathname = usePathname();

     // The Below Function is used to fetch the user details on first render and whenever the pathname changes

     const fetchUser = async ()=>{
   try {
    const res = await api.get("/api/auth/get-me")
    const data =  res.data;
    setUser(data.userDetail)
      console.log("the data is",data)
   } catch (error) {
    console.log("Error while fetch user",error.message)
   }
    
  }
  useEffect(()=>{
   const userToken =  localStorage.getItem("accessToken");
   console.log(pathname)
   if(userToken){
    setIsUserPresent(true);
     fetchUser();
   }
  
  },[pathname])

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
  const addToCart = async (item) => {
    // const store = JSON.parse(localStorage.getItem("ProductInfo")) || [];
    // store.push(item);
    // localStorage.setItem("ProductInfo", JSON.stringify(store));
    // setCartItem(store);

    try {
      const res = await api.post("/api/cart/addToCart",item);
      console.log("Add to cart response:", res.data);
      const data = res.data;

      if(data.success){
        // setCartItem(data.cart.products);
        // console.log(cartItem)
        // localStorage.setItem("ProductInfo", JSON.stringify(data.cart.products));
       
        alert("Item added to cart successfully!");
         await fetchCartItems();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  // The below function is used to fetch the item from the cart

  const fetchCartItems = async ()=>{
    try {
      const res = await api.get("/api/cart/getCart");
      const data = res.data;
      // console.log("Cart items fetched:", data);
      if(data.cart&&data.cart.products){
        setCartItem(data.cart.products);
        
        localStorage.setItem("ProductInfo", JSON.stringify(data.cart.products));
      }else{
        setCartItem([]);
        localStorage.setItem("ProductInfo", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error); 
    }
  }
  useEffect(() => {
  
   if(isUserPresent){
    fetchCartItems();
   }
  
}, [isUserPresent]);

  const removeCart = async (id) => {
    // const storeItem = JSON.parse(localStorage.getItem("ProductInfo"));
    // const update = storeItem.filter((product) => product._id !== item._id);
    // localStorage.setItem("ProductInfo", JSON.stringify(update));
    // setCartItem(update);
    try {
      const res = await api.delete(`/api/cart/removeItem/${id}`);
    
      if (res.data.success) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }
 
  const updateCartQuantity = async (id, quantity) => {
    try {
      const res = await api.patch(`/api/cart/updateQuantity/${id}`, { quantity });
      if (res.data.success) {
        await fetchCartItems();
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };


  const isInCart = (id) => { 
    return cartItem.some((product) => product._id === id);
  }
  const TotalPrice = () => {
    return cartItem.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }
  return (
    <Context.Provider value={{  addToCart, cartItem,setCartItem, isInCart, removeCart, TotalPrice, addToWhislisht, isInWhishlist, whishlist, removeWhislistItem,user,isUserPresent, updateCartQuantity }}>
      {children}
    </Context.Provider>
  )
}

export default ProductContext