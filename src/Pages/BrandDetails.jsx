 import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Components/Cards';
import Loader from '../Components/Loader';

export default function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function getBrandDetails() {
       setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      setBrand(data.data);
      setLoading(false);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching brand details:', error);
    }
  }

  async function getProductsByBrand() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const filteredProducts = data.data.filter(p => p.brand?._id === id);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products for brand:', error);
    }
  }

  useEffect(() => {
    getBrandDetails();
    getProductsByBrand();
  }, [id]);

  return (
    <div className="container mx-auto  py-10 text-center">
      {loading ? (
      <Loader />
      ) : (
        <>
        

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4   gap-6 mt-6">
            {products.map(product => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
