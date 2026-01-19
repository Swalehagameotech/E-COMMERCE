import { useState, useEffect } from 'react';
import ProductScrollSection from './ProductScrollSection';
import featuredProductAPI from '../utils/featuredProductApi';

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await featuredProductAPI.getFeaturedProducts();
        if (response.success) {
          setProducts(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  return <ProductScrollSection title="Featured Products" products={products} collectionType="featuredproducts" />;
};

export default FeaturedSection;
