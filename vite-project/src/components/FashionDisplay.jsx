import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import fashionAPI from '../utils/fashionApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';

const FashionDisplay = ({ category, searchQuery }) => {
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
          response = await fashionAPI.searchFashion(searchQuery);
        } else if (category) {
          response = await fashionAPI.filterByCategory(category);
        } else {
          response = await fashionAPI.getFashion({ limit: 50 });
        }

        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError('Failed to fetch fashion');
        }
      } catch (err) {
        console.error('Error fetching fashion:', err);
        if (err.response?.status === 404) {
          setError('Backend server not found. Please make sure the server is running on http://localhost:5000');
        } else if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to backend server. Please start the server: cd server && npm start');
        } else {
          setError('Error loading fashion. Please check if the backend server is running.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}?collection=fashion`);
  };

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading fashion...</p>
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
        <p className="text-gray-600 text-lg">No fashion found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout - 2 columns on mobile, responsive scaling */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div 
                className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  style={{ imageRendering: 'auto' }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col text-center">
                <h3 className="text-base font-serif text-primary mb-1 line-clamp-1 group-hover:underline decoration-accent underline-offset-4 decoration-1 transition-all">
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
            </div>
          ))}
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default FashionDisplay;
