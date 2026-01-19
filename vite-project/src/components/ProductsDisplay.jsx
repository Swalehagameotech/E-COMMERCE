import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import productAPI from '../utils/productApi';
import footwearAPI from '../utils/footwearApi';
import fashionAPI from '../utils/fashionApi';
import othersAPI from '../utils/othersApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';
import FilterSidebar from './FilterSidebar';
import FilterButton from './FilterButton';
import { useProductFilters } from '../utils/useProductFilters';

const ProductsDisplay = ({ category, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: ['', ''],
    selectedDiscounts: [],
    selectedBrands: [],
    sortBy: 'newest'
  });

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filtered = useProductFilters(products, filters);

  useEffect(() => {
    setFilteredProducts(filtered);
  }, [filtered]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (searchQuery && searchQuery.trim()) {
          const trimmedQuery = searchQuery.trim();
          const [productsResult, footwearResult, fashionResult, othersResult] =
            await Promise.allSettled([
              productAPI.searchProducts(trimmedQuery),
              footwearAPI.searchFootwear(trimmedQuery),
              fashionAPI.searchFashion(trimmedQuery),
              othersAPI.searchOthers(trimmedQuery)
            ]);

          const allProducts = [];

          if (productsResult.status === 'fulfilled' && productsResult.value?.success) {
            allProducts.push(
              ...(productsResult.value.data || []).map(p => ({
                ...p,
                _collectionType: 'products'
              }))
            );
          }
          if (footwearResult.status === 'fulfilled' && footwearResult.value?.success) {
            allProducts.push(
              ...(footwearResult.value.data || []).map(p => ({
                ...p,
                _collectionType: 'footwear'
              }))
            );
          }
          if (fashionResult.status === 'fulfilled' && fashionResult.value?.success) {
            allProducts.push(
              ...(fashionResult.value.data || []).map(p => ({
                ...p,
                _collectionType: 'fashion'
              }))
            );
          }
          if (othersResult.status === 'fulfilled' && othersResult.value?.success) {
            allProducts.push(
              ...(othersResult.value.data || []).map(p => ({
                ...p,
                _collectionType: 'others'
              }))
            );
          }

          setProducts(allProducts);
        } else if (category && category.trim()) {
          response = await productAPI.filterByCategory(category);
          if (response.success) {
            setProducts(
              (response.data || []).map(p => ({
                ...p,
                _collectionType: 'products'
              }))
            );
          } else {
            setError('Failed to fetch products');
          }
        } else {
          response = await productAPI.getProducts({ limit: 50 });
          if (response.success) {
            setProducts(
              (response.data || []).map(p => ({
                ...p,
                _collectionType: 'products'
              }))
            );
          } else {
            setError('Failed to fetch products');
          }
        }
      } catch (err) {
        setError('Error loading products. Please check backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  useEffect(() => {
    setFilters({
      priceRange: ['', ''],
      selectedDiscounts: [],
      selectedBrands: [],
      sortBy: 'newest'
    });
  }, [category, searchQuery]);

  const handleProductClick = (product, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    navigate(`/product/${product._id}?collection=${product._collectionType || 'products'}`);
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 py-12">{error}</p>;
  }

  const filterCount =
    filters.selectedDiscounts.length +
    filters.selectedBrands.length +
    (filters.priceRange[0] || filters.priceRange[1] ? 1 : 0);

  return (
    <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <FilterButton
            onClick={() => setShowFilters(true)}
            isActive={showFilters}
            filterCount={filterCount}
          />
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="flex gap-6 items-start">

          {/* ✅ FIXED STICKY FILTER SIDEBAR */}
          <div className="hidden lg:block w-[20%] sticky top-24 self-start h-fit">
            <FilterSidebar
              products={products}
              onFilterChange={setFilters}
              isOpen
            />
          </div>

          {/* Products section */}
          <div className="w-full lg:w-[80%] no-scrollbar">

            {/* Mobile filter drawer */}
            <div className="lg:hidden">
              <FilterSidebar
                products={products}
                onFilterChange={setFilters}
                onClose={() => setShowFilters(false)}
                isOpen={showFilters}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <div
                  key={product._id}
                  onClick={e => handleProductClick(product, e)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-base font-serif text-primary mb-1 line-clamp-1 text-center group-hover:underline decoration-accent underline-offset-4 decoration-1 transition-all">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1 uppercase tracking-wide">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-center gap-3">
                    {product.discounted_price ? (
                      <>
                        <p className="text-sm font-medium text-accent">
                          ₹{product.discounted_price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          ₹{(product.original_price || product.price || 0).toLocaleString('en-IN')}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-medium text-primary">
                        ₹{(product.original_price || product.price || 0).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No products match your filters</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default ProductsDisplay;
