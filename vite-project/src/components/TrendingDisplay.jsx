import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import trendingAPI from '../utils/trendingApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';
import FilterSidebar from './FilterSidebar';
import FilterButton from './FilterButton';
import { useProductFilters } from '../utils/useProductFilters';

const TrendingDisplay = () => {
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
        const response = await trendingAPI.getTrending();
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}?collection=trending`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-secondary pt-24 sm:pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex gap-6 items-start">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block w-[20%] sticky top-24 self-start h-fit">
              <FilterSidebar
                products={products}
                onFilterChange={setFilters}
                isOpen
                categoryName="Trending"
              />
            </div>

            {/* Products section */}
            <div className="w-full lg:w-[80%] no-scrollbar">
              {/* Mobile filter drawer */}
              <div className="lg:hidden mb-4">
                <FilterButton
                  onClick={() => setShowFilters(true)}
                  filterCount={
                    (filters.selectedDiscounts?.length || 0) +
                    (filters.selectedBrands?.length || 0) +
                    (filters.priceRange?.[0] || filters.priceRange?.[1] ? 1 : 0)
                  }
                />
                <FilterSidebar
                  products={products}
                  onFilterChange={setFilters}
                  onClose={() => setShowFilters(false)}
                  isOpen={showFilters}
                  categoryName="Trending"
                />
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product)}
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

                      <h3 className="text-base font-serif text-primary mb-1 line-clamp-1 text-center">
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
              )}
            </div>
          </div>
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default TrendingDisplay;
