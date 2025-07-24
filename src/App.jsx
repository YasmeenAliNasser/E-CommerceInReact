import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import LayOut from "./Pages/LayOut";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AuthContextProvider from "./Context/AuthContext";
import CartContextFunc from "./Context/CartContext";
import Brands from "./Pages/Brands";
import Categories from "./Pages/Categories";
import BrandDetails from "./Pages/BrandDetails";
import Products from "./Pages/Products";
import CategoryDetails from "./Pages/CategoryDetails";
import Cart from "./Pages/Cart";
import ProductDetails from "./Components/ProductDetails";
import Favorites from "./Pages/Fav";
import FavContextProvider from "./Context/FavContext";
import ForgotPassword from "./Pages/ForgetPass";
import CashOrder from "./Pages/CashOrder";
 
 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element:  <Cart/>,
        }, 
        {
          path: "/fav",
          element:  <Favorites/>,
        },

         {
          path: "/categories",
          element:   <Categories/>,
        },
        {
          path: "/categories/:id",
          element:   <CategoryDetails/>,
        },
        {
          path: "/brands",
          element:  <Brands/>,
        },
         {
          path: "/productdetails/:id",
          element:   <ProductDetails/>,
        },
        {
          path: "/products",
          element:  <Products/>,
        },
         {
          path: "/brands/:id",
          element:   <BrandDetails/>,
        },
         {
          path: "/reg",
          element: <Register/>,
        },
        {
          path: "/cash",
          element: <CashOrder/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/forget",  
          element: <ForgotPassword/>,
        },
         
      ],
    },
  ]);

  return (
    <div>
    <AuthContextProvider>
      <CartContextFunc>
      <FavContextProvider>

        <RouterProvider router={router} />

      </FavContextProvider>    
      </CartContextFunc>
  </AuthContextProvider>
    </div>
  );
}

export default App;
