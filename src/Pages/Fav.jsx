import React, { useContext } from "react";
import { FavContext } from "../Context/FavContext";
import { FaArrowLeft, FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContextVar } from "../Context/CartContext";

export default function Favorites() {
  const { favorites, deleteProduct, clearFavorites } = useContext(FavContext);
  let { addProductToCart } = useContext(CartContextVar);

  return (
    <div className="pt-30 flex justify-center"> 
      <div className="cart bg-gray-100 w-3/4 m-auto rounded-2xl">
        <div>
          <div className="title flex justify-between pt-10 pl-7 pr-7">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-white text-2xl circle flex justify-center items-center hover:left-6"
              >
                <FaArrowLeft />
              </Link>
              <h2 className="text-2xl font-extrabold text-green-700">
                Favorites
              </h2>
              <i className="fa-solid fa-heart text-primary text-xl"></i>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl text-green-700 font-bold mb-6">
                Total Favorites:
                <span className="text-green-400 ml-2">{favorites.length}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex flex-col md:space-x-6 xl:px-0">
          <div className="rounded-lg w-full">
            {favorites.length === 0 ? (
              <div className="text-center py-10 text-xl font-semibold text-gray-600">
               <Link to={"/products"}>
                  <button
                   
                    className="flex justify-center items-center bg-primary hover:bg-green-700   text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    <div className="size-3   bg-green-500    rounded-4xl">
                      
                    </div>
                    <span>Add Your First Product To Fav</span>
                  </button>
               </Link>
              </div>
            ) : (
              favorites.map((item) => (
                <div className="  h-full  mb-6 rounded-lg   gap-6    flex  justify-center items-center  ">
                  <img
                    src={item?.imageCover}
                    alt="product-image"
                    className="w-full rounded-2xl  border-2 border-gray-200 sm:w-40"
                  />

                  {/* info */}

                  <div className="sm:ml-4 sm:flex sm:w-full  ">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-xl font-bold  text-darkPrimary">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-lg  text-primary flex  gap-2 ">
                        <span className=" text-darkPrimary">Rate:</span>
                        <span className=" text-yellow-400">
                          <FaStar />
                        </span>
                        {item?.ratingsAverage}
                      </p>
                      <p className="mt-1 text-lg  text-primary flex gap-2">
                        <span className=" text-darkPrimary"> Price: </span> EGP
                        {item?.price}
                      </p>
                      <p className="mt-1 text-lg text-gray-500">
                        {item?.category?.name || "No Category"} |{" "}
                        {item?.brand?.name}|{" "}
                        <span className="   text-primary">Available</span>
                      </p>
                    </div>
                  </div>

                   
                 <div className="flex h-11 gap-3 w-full">
                     {/* Add */}
                  <button
                    onClick={() => addProductToCart(item._id)}
                    className="flex justify-center items-center bg-primary hover:bg-green-700   text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                  >
                    <div className="size-3 flex bg-green-500 flex justify-center items-center rounded-4xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                    <span>ADD TO CART</span>
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded-xl"
                  >
                    Remove
                  </button>
                 </div>

                 
                </div>
              ))
            )}
          </div>

          {favorites.length > 0 && (
            <div
              onClick={clearFavorites}
              className="mt-2 ml-auto w-fit px-4 py-2 flex items-center gap-2 bg-red-700 hover:bg-red-500 text-white rounded-xl cursor-pointer transition"
            >
              <FaTrash />
              <span>Clear All Favorites</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 