import { useState, useEffect } from 'react';
import ProductScrollSection from './ProductScrollSection';
import newArrivalAPI from '../utils/newArrivalApi';

const NewArrivalSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await newArrivalAPI.getNewArrivals();
        if (response.success) {
          setProducts(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  return <ProductScrollSection title="New Arrival" products={products} collectionType="newarrival" />;
};

export default NewArrivalSection;
