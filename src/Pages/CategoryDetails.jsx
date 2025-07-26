 import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Components/Cards';
import { FaArrowLeft } from 'react-icons/fa';
import Loader from '../Components/Loader';

export default function CategoryDetails() {
  const { id } = useParams();
  const [Category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function getCategoryDetails() {
     setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setCategory(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  }

  async function getProductsByCategory() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const filteredProducts = data.data.filter(p => p.category?._id === id);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products for category:', error);
    }
  }

  useEffect(() => {
    getCategoryDetails();
    getProductsByCategory();
  }, [id]);

  return (
    <div className="container mx-auto py-10 text-center   pt-24">
     
      {loading ? (
    <Loader/>
      ) : (
        <>
        <Link
          to="/"
          className="text-white text-2xl circle flex justify-center items-center hover:left-6"
        >
          <FaArrowLeft />
        </Link>
          <h2 className="text-3xl font-bold text-primary mb-8">{Category?.name}</h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {products.map(product => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No products found in this category.</p>
          )}
        </>
      )}
    </div>
  );
}
