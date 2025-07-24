 import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const FavContext = createContext(null);

export default function FavContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  async function getLoggedUserFav() {
  try {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setFavorites(data?.data || []);
  } catch (error) {
    console.log(error);
  }
}


   async function  addProductToFav(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Product added to Fav')
      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  }

   async function  deleteProduct (favItem) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${favItem}`, 
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success('Product deleted from Fav')
      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  }
   useEffect(() => {
    getLoggedUserFav();
  }, []);

  return (
    <FavContext.Provider  value={{ favorites,addProductToFav,deleteProduct}}>
      
      {children}
    </FavContext.Provider>
  );
}
 