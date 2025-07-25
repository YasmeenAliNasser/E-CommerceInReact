import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Cards";
import Loader from "../Components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import CategorySlider from "../Components/CategorySlider";

export default function Home() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  async function getAllProducts() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className=" w-10/12 m-auto">
      {/* home section */}
      <div className="container  pt-40   ">
        <div className="grid grid-cols-1 md:grid-cols-3  ">
          {/* Left - Swiper  */}
          <div className="md:col-span-2 relative">
            <Swiper autoplay={false} className="h-full">
              <SwiperSlide className="relative">
                <img
                  src="https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=2691&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Slide 1"
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-10 left-10  bg-opacity-50    rounded-lg max-w-md">
                  <div className="text-4xl  font-extrabold text-darkPrimary gap-4 flex justify-center items-center bg-white rounded-4xl w-3/4 h-14">
                    <i className="fa-brands fa-opencart fa-lg text-primary"></i>
                    <span>Fresh Cart</span>
                  </div>
                  <p className="mt-2 text-sm text-white w-full    ">
                    Whether you’re looking for the freshest produce, pantry
                    staples, or specialty items, FreshCart brings the
                    supermarket to you, redefining the way you shop for
                    groceries.
                  </p>
                  <button className="mt-3 px-14 py-2 bg-green-500 hover:bg-green-600 text-white rounded rounded-2xl">
                    Get Started
                  </button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src=" https://eco-iota-amber.vercel.app/assets/product3-CjkhanyU.jpg"
                  alt="Slide 2"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://eco-iota-amber.vercel.app/assets/product2-Cc8hawmZ.jpg"
                  alt="Slide 3"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            </Swiper>

            <div className="absolute top-5 left-5 text-white">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-white p-1 rounded-full text-green-600">
                  🛒
                </span>
                Fresh Cart
              </h1>
              <p className="max-w-md mt-2">
                Whether you’re looking for the freshest produce, pantry staples,
                or specialty items, FreshCart brings the supermarket to you.
              </p>
              <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
                Get Started
              </button>
            </div>
          </div>

          {/* Right - */}
          <div className="grid grid-rows-2">
            <img
              src="https://eco-iota-amber.vercel.app/assets/product5-DZxbnV6L.jpg"
              alt="Top"
              className="w-full h-full object-cover"
            />
            <img
              src="https://eco-iota-amber.vercel.app/assets/product4-CxeAzYXu.jpg"
              alt="Bottom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* some Category */}

      <div className="container   mt-7 ">
        <h1 className=" text-2xl text-darkPrimary font-extrabold">
          Shope now by popular categories
        </h1>
        <CategorySlider />
      </div>
      {/* some Products */}
      <div className=" mt-9">
        <div className="title mt-44">
          <h1 className=" text-center text-4xl  text-darkSec font-bold  pt-3">
            Shope now by popular products
          </h1>
          <hr className=" w-1/6 m-auto text-gray-300 mt-5  h-4" />
        </div>
        <div className="container "> 
          {loading ? (
            <Loader />
          ) : (
            <div className="grid  gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, 12).map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
