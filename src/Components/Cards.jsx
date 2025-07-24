import { Eye, Heart, Star } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContextVar } from "../Context/CartContext";
import { FavContext } from "../Context/FavContext";

export default function Card({ product }) {
  let { addProductToCart } = useContext(CartContextVar);
  let { favorites, addProductToFav, deleteProduct } = useContext(FavContext);

   
  const isInFavorites =
    Array.isArray(favorites) &&
    favorites.some((item) => item._id === product._id);

  return (
    <div className="card mt-6 rounded-2xl shadow-lg h-full min-h-[500px] cursor-pointer">
      <div className="relative item">
        <img
          src={product.imageCover}
          className="w-full h-full rounded-2xl mx-auto"
          alt={product.slug}
        />
        <div className="layer flex justify-center items-center gap-4">
         
          <div
            onClick={() =>
              isInFavorites
                ? deleteProduct(product._id)
                : addProductToFav(product._id)
            }
            className="circle size-9 bg-green-500 flex justify-center items-center rounded-4xl"
          >
            <Heart
              className="size-5"
              color="white"
              fill={isInFavorites ? "red" : "none"}
            />
          </div>

          
          <div
            onClick={() => {
              addProductToCart(product._id);
            }}
            className="circle size-9 bg-green-500 flex justify-center items-center rounded-4xl"
          >
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

          
          <Link to={`/productdetails/${product._id}`}>
            <div className="circle size-9 bg-green-500 flex justify-center items-center rounded-4xl">
              <Eye className="text-white" />
            </div>
          </Link>
        </div>

        {/* خصم */}
        <span className="absolute top-2 left-2 p-2 rounded-2xl">
          <span className="flex flex-col items-center font-bold text-orange-400">
            <span className="text-sm font-normal whitespace-nowrap">50%</span>
            <span className="text-sm text-primary">Sale</span>
          </span>
        </span>
      </div>

      <div className="">
        <h3 className="text-primary text-xl text-capitalize">
          {product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </h3>
        <h3 className="text-2xl">{product.category.title}</h3>
        <p className="text-sm text-gray-500">{product.brand.name}</p>
        {product.quantity > 0 ? (
          <span className="text-green-500 text-xl">Available</span>
        ) : (
          <span>notAvailable</span>
        )}
      </div>

      <div className="flex justify-between">
        <p className="text-3xl font-extrabold text-blue-800">
          {product.price}$
        </p>
        <span className="flex gap-3">
          <Star className="text-yellow-400" />
          {product.ratingsAverage}
        </span>
      </div>
    </div>
  );
}
