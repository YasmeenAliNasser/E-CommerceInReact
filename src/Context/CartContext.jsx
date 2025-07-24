import axios from "axios";
import React from "react";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContextVar = createContext(null);

export default function CartContextFunc({ children }) {
  let [cart, setCart] = useState(null);
  let [disabled, setDisabled] = useState(false); 
 
   async function getLoggedUserCart() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token,
      },
    });
    setCart(data);
  } catch (error) {
    console.log("Failed to fetch cart:", error);
  }
}


   async function  addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",{
            productId
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Product added to cart')
       localStorage.setItem("productId", data.data._id);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }
  

  async function  deleteProduct (cartItem) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItem}`, 
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Product deleted from cart')
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function  clearCart ( ) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart `, 
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Cart is clear')
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }


    
  async function  UpdataCounter (cartItem ,count) {
    setDisabled(true)
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItem}`, 
        {
           
            count:count
         
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Product deleted from cart')
      setCart(data);
    } catch (error) {
      console.log(error);
    }finally{
      setDisabled(false)
    }
  }



  useEffect(() => {
    getLoggedUserCart();
  }, []);
  return (
    <CartContextVar.Provider value={{ cart,addProductToCart,deleteProduct,clearCart ,UpdataCounter,disabled}}>
      {children}
    </CartContextVar.Provider>
  );
}
