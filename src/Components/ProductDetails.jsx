import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart, FaStar } from "react-icons/fa";
import { CartContextVar } from "../Context/CartContext";

export default function ProductDetails( ) {
  let [Product, setProduct] = useState(null);
  let { addProductToCart } = useContext(CartContextVar);

  let { id } = useParams();
 
  console.log(id);

   async function getProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      getRelatedProducts(data.data.category._id);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }  
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function getRelatedProducts(cateid) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${cateid}`
      );
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="container mx-auto bg-white   rounded-lg overflow-hidden pt-9">
        <div className="flex flex-col     md:flex-row">
          <div className="md:w-1/3 p-4 relative">
            <div className=" ">
              <img
                src={Product?.imageCover}
                alt={Product?.description}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            <div>
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {Product?.images.map((image) => (
                  <SwiperSlide>
                    <img src={image} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="md:w-2/3 pt-30">
            <h1 className="text-4xl text-darkPrimary  font-extrabold    mb-2">
              {Product?.title}
            </h1>
            <p className=" text-xl font-bold text-primary">
              {Product?.category.name}
            </p>
            <p className=" text-xl">
              {Product?.brand.name}|
              <span className=" text-primary"> Avaliable</span>
            </p>
            <div className="flex items-center mb-4">
              <span className="   flex text-darkPrimary text-xl font-semibold px-2.5 py-0.5 rounded">
                <span className=" text-yellow-400">
                  <FaStar />
                </span>
                {Product?.ratingsAverage}
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-4">{Product?.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold   text-primary">
                  EGP {Product?.price}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className=" bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                <FaHeart />
              </button>
              <button
                onClick={() => {
                  addProductToCart(Product._id);
                }}
                className=" flex justify-center items-center  bg-primary hover:bg-green-700 w-3/4 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                <div className="  size-9 bg-green-500 flex justify-center items-center  rounded-4xl">
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
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
