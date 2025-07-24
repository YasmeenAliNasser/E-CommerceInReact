import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Card from "../Components/Cards";
import { FaArrowLeft, FaFilter, FaArrowCircleLeft } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 6;

  async function getAllProducts() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
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

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category.name);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand.name);

      const matchesPrice = p.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleCheckboxChange(value, setFn, selectedValues) {
    if (selectedValues.includes(value)) {
      setFn(selectedValues.filter((v) => v !== value));
    } else {
      setFn([...selectedValues, value]);
    }
  }

  return (
    <div className="relative pt-22">
       
      <div className="bg-gray-100 py-4 px-6 shadow-sm  container rounded-2xl">
        <div className="flex justify-between items-center">
          <Link
            to="/ "
            className="text-white text-2xl circle flex justify-center items-center hover:left-6"
          >
            <FaArrowLeft />
          </Link>

          <input
            type="text"
            placeholder="Search  ..."
            className="w-full max-w-md mx-4 px-4 py-2 border rounded-2xl shadow-sm  bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => setShowSidebar(true)}
            className="text-green-600 text-xl"
          >
            <FaFilter />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Card key={product._id} product={product} />
                ))
              ) : (
                <p>No products match the filters.</p>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-6 text-gray-600">
                {currentPage > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="text-green-600 flex items-center"
                    >
                      <FaArrowCircleLeft className="mr-1" /> Go to page 1
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="border border-green-600 text-green-600 px-4 py-2 rounded"
                    >
                      ←
                    </button>
                  </>
                )}

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600"
                  disabled={currentPage === totalPages}
                >
                  Next Page →
                </button>

                <span className="text-sm text-black ml-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-5 z-50 transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* زر إغلاق */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-4 right-4 text-red-500 text-2xl"
        >
          <IoIosCloseCircle />
        </button>

        {/* المحتوى */}
        <h2 className="text-lg font-bold mb-4 text-green-600">SORT</h2>
        <div className="mb-6">
          <label className="block mb-2">
            <input
              type="radio"
              name="sort"
              onChange={() => setSortOrder("asc")}
              className="mr-2"
            />
            Smaller to Bigger
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() => setSortOrder("desc")}
              className="mr-2"
            />
            Bigger to Smaller
          </label>
        </div>

        <h2 className="text-lg font-bold mb-4 text-green-600">FILTER</h2>

        <div className="mb-6">
          <label className="block mb-2 text-sm text-gray-700">
            Price Range:
          </label>
          <input
            type="range"
            min="0"
            max="40000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-500">
            Max Price: EGP {maxPrice.toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
          {["Electronics", "Men's Fashion", "Women's Fashion"].map((cat) => (
            <label key={cat} className="block">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange(
                    cat,
                    setSelectedCategories,
                    selectedCategories
                  )
                }
                className="mr-2"
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2 border-none">
            Brands
          </h3>
          {["Canon", "Dell", "DeFacto", "Puma"].map((brand) => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                onChange={() =>
                  handleCheckboxChange(brand, setSelectedBrands, selectedBrands)
                }
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>
      </aside>
    </div>
  );
}
