import { useMemo } from 'react';

/**
 * Custom hook to filter and sort products
 * @param {Array} products - Array of products to filter
 * @param {Object} filters - Filter configuration object
 * @returns {Array} - Filtered and sorted products
 */
export const useProductFilters = (products, filters) => {
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered = [...products];

    // Price Range Filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(product => {
        const price = product.discounted_price || product.price || 0;
        return price >= (minPrice || 0) && price <= (maxPrice || Infinity);
      });
    }

    // Discount Filter
    if (filters.selectedDiscounts && filters.selectedDiscounts.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.discounted_price && !product.discount_percent) return false;
        
        let discountPercent = 0;
        if (product.discount_percent) {
          discountPercent = product.discount_percent;
        } else if (product.price && product.discounted_price) {
          discountPercent = Math.round(((product.price - product.discounted_price) / product.price) * 100);
        }

        return filters.selectedDiscounts.some(selectedDiscount => {
          return discountPercent >= selectedDiscount;
        });
      });
    }

    // Brand Filter
    if (filters.selectedBrands && filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => {
        const brand = product.brand_name || product.brand;
        return brand && filters.selectedBrands.includes(brand);
      });
    }


    // Sort Products
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            const priceA = a.discounted_price || a.price || 0;
            const priceB = b.discounted_price || b.price || 0;
            return priceA - priceB;

          case 'price-high':
            const priceAHigh = a.discounted_price || a.price || 0;
            const priceBHigh = b.discounted_price || b.price || 0;
            return priceBHigh - priceAHigh;

          case 'rating':
            const ratingA = a.stars || a.rating || 0;
            const ratingB = b.stars || b.rating || 0;
            return ratingB - ratingA;

          case 'newest':
          default:
            const dateA = new Date(a.createdAt || a._id || 0);
            const dateB = new Date(b.createdAt || b._id || 0);
            return dateB - dateA;
        }
      });
    }

    return filtered;
  }, [products, filters]);

  return filteredProducts;
};

export default useProductFilters;
