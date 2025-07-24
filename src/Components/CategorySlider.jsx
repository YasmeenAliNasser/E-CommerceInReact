import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  function handleClick(categoryId) {
    navigate(`/categories/${categoryId}`);
  }

  return (
    <div className="bg-white px-0">
      <div className="container mx-auto py-6 px-0">
       
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div
                  onClick={() => handleClick(category._id)}
                  className="cursor-pointer bg-white hover:shadow-xl transition duration-300 overflow-hidden text-center"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-md font-semibold text-gray-700 py-3 bg-gray-100">
                    {category.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
