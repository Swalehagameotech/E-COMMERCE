import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, ArrowLeft } from 'lucide-react';
import Hero from './Hero';
import { useCart } from '../context/CartContext';
import SuggestionsSection from './SuggestionsSection';
import newArrivalAPI from '../utils/newArrivalApi';
import trendingAPI from '../utils/trendingApi';
import discountAPI from '../utils/discountApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const collectionType = searchParams.get('collection') || 'newarrival';
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let response;

        if (collectionType === 'newarrival') {
          response = await newArrivalAPI.getNewArrivalById(id);
        } else if (collectionType === 'trending') {
          response = await trendingAPI.getTrendingById(id);
        } else if (collectionType === 'discount') {
          response = await discountAPI.getDiscountById(id);
        } else {
          response = await newArrivalAPI.getNewArrivalById(id);
        }

        if (response.success) {
          setProduct(response.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const fetchSuggestions = async () => {
      try {
        let response;
        if (collectionType === 'newarrival') {
          response = await newArrivalAPI.getNewArrivals();
        } else if (collectionType === 'trending') {
          response = await trendingAPI.getTrending();
        } else if (collectionType === 'discount') {
          response = await discountAPI.getDiscounts();
        }

        if (response && response.success) {
          // Filter out current product and limit to 8
          const filtered = (response.data || [])
            .filter(p => p._id !== id)
            .slice(0, 8);
          setSuggestions(filtered);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    if (id) {
      fetchProduct();
      fetchSuggestions();
    }
  }, [id, collectionType]);

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      navigate('/checkout', { state: { buyNowProduct: product } });
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product?.stock || 10)));
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  if (loading) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Hero />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <button
              onClick={() => navigate('/home')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
    }
    return stars;
  };

  return (
    <>
      {/* Back Arrow */}
    <button
  onClick={handleBackClick}
  className="fixed top-28 sm:top-20 left-4 z-[110] bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
>
  <ArrowLeft className="h-5 w-5" />
</button>

      
      <Hero />
      <div className="min-h-screen pt-20   bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16">

            {/* Left Side - Product Image */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 sticky top-24">
                <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {product.brand_name && (
                  <p className="text-lg sm:text-xl text-gray-600 mb-4">
                    Brand: <span className="font-semibold">{product.brand_name}</span>
                  </p>
                )}

                {product.stars && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">{renderStars(product.stars)}</div>
                    <span className="text-gray-600">({product.stars})</span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    {product.discounted_price ? (
                      <>
                        <span className="text-3xl sm:text-4xl font-bold text-[#664343]">
                          ₹{product.discounted_price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-400 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl sm:text-4xl font-bold text-purple-600">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {product.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  {product.material && (
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium w-24">Material:</span>
                      <span className="text-gray-600">{product.material}</span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium w-24">Color:</span>
                      <span className="text-gray-600">{product.color}</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium w-24">Category:</span>
                      <span className="text-gray-600 capitalize">{product.category}</span>
                    </div>
                  )}
                  {product.subcategory && (
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-medium w-24">Subcategory:</span>
                      <span className="text-gray-600 capitalize">{product.subcategory}</span>
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center font-bold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex font-bold items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#B77466] hover:bg-[#896C6C] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#795757] hover:bg-[#664343] text-white font-medium py-3 px-6 rounded-lg transition-colors
             focus-visible:outline-none focus-visible:ring-0"
                  >
                    Buy Now
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          {suggestions.length > 0 && (
            <SuggestionsSection products={suggestions} collectionType={collectionType} />
          )}
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default ProductDetails;
