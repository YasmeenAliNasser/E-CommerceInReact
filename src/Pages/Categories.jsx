 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  async function getCategories() {
     setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      console.log(data.data);
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

  const visibleCategories = showAll ? categories : categories.slice(0, 10);

  return (
    <div>
      <div className="title">
        <hr className="w-3/4 m-auto text-gray-300   " />
        <h1 className="text-center text-2xl text-primary pt-3">
          Shop by Category
        </h1>
        <hr className="w-3/4 m-auto text-gray-300 mt-5 " />
      </div>

      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">All Categories</h2>
        {loading ? (
        <Loader/>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {visibleCategories.map((category) => (
                <div
                  key={category._id}
                  className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden text-center"
                  onClick={() => handleClick(category._id)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-contain  hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-700 pb-4">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 cursor-pointer bg-primary text-white rounded hover:bg-darkPrimary transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
