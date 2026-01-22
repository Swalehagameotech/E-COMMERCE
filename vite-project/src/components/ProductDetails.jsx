import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, ArrowLeft } from 'lucide-react';
import Hero from './Hero';
import { useCart } from '../context/CartContext';
import SuggestionsSection from './SuggestionsSection';
import newArrivalAPI from '../utils/newArrivalApi';
import trendingAPI from '../utils/trendingApi';
import discountAPI from '../utils/discountApi';
import footwearAPI from '../utils/footwearApi';
import fashionAPI from '../utils/fashionApi';
import othersAPI from '../utils/othersApi';
import productAPI from '../utils/productApi';
import featuredProductAPI from '../utils/featuredProductApi';
import AuthModal from './AuthModal';
import Footer from './Footer';
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
        setError(null);
        let response = null;
        let found = false;

        // Try the specified collection type first
        try {
          if (collectionType === 'products') {
            response = await productAPI.getProductById(id);
          } else if (collectionType === 'newarrival') {
            response = await newArrivalAPI.getNewArrivalById(id);
          } else if (collectionType === 'trending') {
            response = await trendingAPI.getTrendingById(id);
          } else if (collectionType === 'discount') {
            response = await discountAPI.getDiscountById(id);
          } else if (collectionType === 'footwear') {
            response = await footwearAPI.getFootwearById(id);
          } else if (collectionType === 'fashion') {
            response = await fashionAPI.getFashionById(id);
          } else if (collectionType === 'others') {
            response = await othersAPI.getOthersById(id);
          } else if (collectionType === 'featuredproducts') {
            response = await featuredProductAPI.getFeaturedProductById(id);
          } else {
            // Default: try products first (accessories), then newarrival
            response = await productAPI.getProductById(id);
            if (!response || !response.success) {
              response = await newArrivalAPI.getNewArrivalById(id);
            }
          }

          if (response && response.success) {
            found = true;
            setProduct(response.data);
          }
        } catch (firstError) {
          // If first attempt fails, try other collections
          console.log('Product not found in specified collection, trying others...');
        }

        // If not found in specified collection, try all other collections
        if (!found) {
          const collections = [
            { api: productAPI, method: 'getProductById', name: 'products' },
            { api: newArrivalAPI, method: 'getNewArrivalById', name: 'newarrival' },
            { api: trendingAPI, method: 'getTrendingById', name: 'trending' },
            { api: discountAPI, method: 'getDiscountById', name: 'discount' },
            { api: footwearAPI, method: 'getFootwearById', name: 'footwear' },
            { api: fashionAPI, method: 'getFashionById', name: 'fashion' },
            { api: othersAPI, method: 'getOthersById', name: 'others' },
            { api: featuredProductAPI, method: 'getFeaturedProductById', name: 'featuredproducts' },
          ];

          // Skip the collection we already tried
          const collectionsToTry = collections.filter(
            col => col.name !== collectionType
          );

          for (const { api, method } of collectionsToTry) {
            try {
              response = await api[method](id);
              if (response && response.success) {
                found = true;
                setProduct(response.data);
                break;
              }
            } catch (e) {
              // Continue to next collection
              continue;
            }
          }
        }

        if (!found) {
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
        if (collectionType === 'products') {
          response = await productAPI.getProducts({ limit: 50 });
        } else if (collectionType === 'newarrival') {
          response = await newArrivalAPI.getNewArrivals();
        } else if (collectionType === 'trending') {
          response = await trendingAPI.getTrending();
        } else if (collectionType === 'discount') {
          response = await discountAPI.getDiscounts();
        } else if (collectionType === 'footwear') {
          response = await footwearAPI.getFootwear();
        } else if (collectionType === 'fashion') {
          response = await fashionAPI.getFashion();
        } else if (collectionType === 'others') {
          response = await othersAPI.getOthers();
        } else if (collectionType === 'featuredproducts') {
          response = await featuredProductAPI.getFeaturedProducts();
        }

        if (response && response.success) {
          // Filter out current product and limit to 20
          const filtered = (response.data || [])
            .filter(p => p._id !== id)
            .slice(0, 20);
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
      // Direct checkout without adding to cart
      navigate('/order-review', {
        state: {
          items: [{
            ...product,
            quantity: quantity,
            // Ensure price fields are correct for calculation in Checkout
            price: product.discounted_price || product.original_price || product.price || 0
          }]
        }
      });
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

{/* Proper spacing for fixed header */}
{/* Proper spacing for fixed header */}
<div className="h-[90px] sm:h-[90px]"></div>


<div className="min-h-screen bg-secondary">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">

          {/* Product Details Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-16">

            {/* Left Side - Product Image */}
  {/* Left Side - Product Image (Sticky) */}
<div className="w-full">
  <div className="bg-white shadow-sm p-3 sm:p-4 sticky top-24">
    <div className="w-full bg-gray-50 flex items-center justify-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-[450px] object-contain"
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        }}
      />
    </div>
  </div>
</div>


            {/* Right Side - Product Details */}
{/* Right Side - Product Details */}
<div className="w-full lg:pl-12 lg:max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
              <div className="bg-transparent p-6 sm:p-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
                  {product.name}
                </h1>

                {product.brand_name && (
                  <p className="text-lg sm:text-xl text-gray-500 mb-6 uppercase tracking-widest font-light">
                    {product.brand_name}
                  </p>
                )}

                <div className="mb-8 border-b border-gray-200 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    {product.discounted_price ? (
                      <>
                        <span className="text-3xl sm:text-4xl font-semibold text-primary">
                          ₹{product.discounted_price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-400 line-through">
                          ₹{(product.original_price || product.price || 0).toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl sm:text-4xl font-semibold text-primary">
                        ₹{(product.original_price || product.price || 0).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {product.description && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Description</h3>
                    <p className="text-black font-bold leading-relaxed font-light">{product.description}</p>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  {product.material && (
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold w-24 text-sm uppercase tracking-wider">Material:</span>
                      <span className="text-gray-600 font-light">{product.material}</span>
                    </div>
                  )}
                  {product.brand && (
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold w-24 text-sm uppercase tracking-wider">Brand:</span>
                      <span className="text-gray-600 font-light">{product.brand}</span>
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-primary font-bold mb-3 text-sm uppercase tracking-wider">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center font-light border border-accent rounded-full hover:bg-accent hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-light w-12 text-center text-primary">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center font-light border border-accent rounded-full hover:bg-accent hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white border border-accent text-accent hover:bg-accent hover:text-white font-bold text-sm uppercase tracking-widest py-4 px-6 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Bag
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#A02E4C] border border-[#A02E4C] hover:bg-white hover:text-primary text-white font-bold text-sm uppercase tracking-widest py-4 px-6 transition-all duration-300 rounded-xl shadow-sm"
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
      <Footer />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default ProductDetails;
