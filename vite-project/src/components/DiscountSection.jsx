import { useState, useEffect } from 'react';
import ProductScrollSection from './ProductScrollSection';
import discountAPI from '../utils/discountApi';

const DiscountSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await discountAPI.getDiscounts();
        if (response.success) {
          setProducts(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching discount products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  return <ProductScrollSection title="10% Discount" products={products} collectionType="discount" />;
};

export default DiscountSection;
