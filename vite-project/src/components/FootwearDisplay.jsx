import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import footwearAPI from '../utils/footwearApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';

const FootwearDisplay = ({ category, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        if (searchQuery) {
          response = await footwearAPI.searchFootwear(searchQuery);
        } else if (category) {
          response = await footwearAPI.filterByCategory(category);
        } else {
          response = await footwearAPI.getFootwear({ limit: 50 });
        }
        
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError('Failed to fetch footwear');
        }
      } catch (err) {
        console.error('Error fetching footwear:', err);
        if (err.response?.status === 404) {
          setError('Backend server not found. Please make sure the server is running on http://localhost:5000');
        } else if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to backend server. Please start the server: cd server && npm start');
        } else {
          setError('Error loading footwear. Please check if the backend server is running.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product);
    // Optional: Show toast notification
  };

  const handleBuyNow = (product) => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    navigate('/checkout', { state: { buyNowProduct: product } });
  };

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading footwear...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-600 text-lg">No footwear found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout - 2 columns on mobile, responsive scaling */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md sm:rounded-lg shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Product Image - Smaller on mobile */}
              <div className="w-full aspect-square bg-gray-100 flex items-center justify-center p-0.5 sm:p-1 md:p-2 lg:p-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>

              {/* Product Info - Smaller text and padding on mobile */}
              <div className="p-1 sm:p-1.5 md:p-2 lg:p-3 xl:p-4 flex flex-col flex-grow">
                <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold text-gray-800 mb-0.5 sm:mb-1 md:mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-600 mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 line-clamp-2 flex-grow leading-tight">
                  {product.description}
                </p>
                
                {/* Price and Add to Cart - Smaller on mobile */}
                <div className="mt-auto">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1 md:mb-2 lg:mb-3">
                    {product.discounted_price ? (
                      <>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-[#A87676]">
                          ₹{product.discounted_price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm line-through text-gray-400">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-[#A87676]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-[#A87676] hover:bg-[#CA8787] text-white font-medium py-0.5 sm:py-1 md:py-1.5 lg:py-2 px-1 sm:px-2 md:px-3 lg:px-4 rounded sm:rounded-md md:rounded-lg transition-colors duration-200 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-base"
                    >
                      <ShoppingCart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Add</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-[#A87676] hover:bg-[#CA8787] text-white font-medium py-0.5 sm:py-1 md:py-1.5 lg:py-2 px-1 sm:px-2 md:px-3 lg:px-4 rounded sm:rounded-md md:rounded-lg transition-colors duration-200 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-base"
                    >
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default FootwearDisplay;
