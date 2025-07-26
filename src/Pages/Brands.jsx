import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

   async function getBrands() {
      setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  function handleClick(brandId) {
    navigate(`/brands/${brandId}`);
  }

   
  const visibleBrands = showAll
    ? brands
    : brands.slice(
        0,
        brands.findIndex((b) => b.name.toLowerCase().includes("toshiba")) + 1
      );

  function handleClick(brandId) {
    navigate(`/brands/${brandId}`);
  }
  return (
    <div>
      <div className="title">
        <hr className="w-3/4 m-auto text-gray-300  " />
        <h1 className=" text-center text-2xl  text-primary pt-3">
          Shop by Brand
        </h1>
        <hr className="w-3/4 m-auto text-gray-300 mt-5 " />
      </div>

      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">All Brands</h2>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6  ">
              {visibleBrands.map((brand) => (
                <div
                  key={brand._id}
                  className="cursor-pointer bg-white rounded-full shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                  onClick={() =>handleClick(brand._id)}
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-40 object-contain p-4 hover:scale-105 transition-transform duration-300"
                  />
                  
                </div>
              ))}
            </div>



            
            <div className="text-center mt-6 ">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2 cursor-pointer  bg-primary text-white   rounded hover: bg-darkPrimary transition"
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
