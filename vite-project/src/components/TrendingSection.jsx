import { useState, useEffect } from 'react';
import ProductScrollSection from './ProductScrollSection';
import trendingAPI from '../utils/trendingApi';

const TrendingSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await trendingAPI.getTrending();
        if (response.success) {
          setProducts(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  return <ProductScrollSection title="Trending" products={products} collectionType="trending" />;
};

export default TrendingSection;
