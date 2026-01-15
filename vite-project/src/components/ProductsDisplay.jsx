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

const ProductsDisplay = ({ category, searchQuery }) => {
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

        if (searchQuery && searchQuery.trim()) {
          const trimmedQuery = searchQuery.trim();
          // Search across all collections
          const [productsResult, footwearResult, fashionResult, othersResult] = await Promise.allSettled([
            productAPI.searchProducts(trimmedQuery),
            footwearAPI.searchFootwear(trimmedQuery),
            fashionAPI.searchFashion(trimmedQuery),
            othersAPI.searchOthers(trimmedQuery)
          ]);

          // Combine results from all collections with collection type
          const allProducts = [];

          if (productsResult.status === 'fulfilled' && productsResult.value?.success) {
            // Products from productAPI are accessories, tag them as 'products' (accessories collection)
            const products = (productsResult.value.data || []).map(p => ({ ...p, _collectionType: 'products' }));
            allProducts.push(...products);
          }
          if (footwearResult.status === 'fulfilled' && footwearResult.value?.success) {
            const products = (footwearResult.value.data || []).map(p => ({ ...p, _collectionType: 'footwear' }));
            allProducts.push(...products);
          }
          if (fashionResult.status === 'fulfilled' && fashionResult.value?.success) {
            const products = (fashionResult.value.data || []).map(p => ({ ...p, _collectionType: 'fashion' }));
            allProducts.push(...products);
          }
          if (othersResult.status === 'fulfilled' && othersResult.value?.success) {
            const products = (othersResult.value.data || []).map(p => ({ ...p, _collectionType: 'others' }));
            allProducts.push(...products);
          }

          setProducts(allProducts);
        } else if (category) {
          // Category filtering is for accessories (anklet, bracelet, necklace, watch)
          // These come from productAPI which uses /api/products
          response = await productAPI.filterByCategory(category);
          if (response.success) {
            // All products from productAPI are accessories, tag them as 'products'
            const products = (response.data || []).map(p => ({ ...p, _collectionType: 'products' }));
            setProducts(products);
          } else {
            setError('Failed to fetch products');
          }
        } else {
          response = await productAPI.getProducts({ limit: 50 });
          if (response.success) {
            // Products from productAPI are accessories, tag them as 'products' (accessories collection)
            const products = (response.data || []).map(p => ({ ...p, _collectionType: 'products' }));
            setProducts(products);
          } else {
            setError('Failed to fetch products');
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (err.response?.status === 404) {
          setError('Backend server not found. Please make sure the server is running on http://localhost:5000');
        } else if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to backend server. Please start the server: cd server && npm start');
        } else {
          setError('Error loading products. Please check if the backend server is running.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const handleProductClick = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!product || !product._id) {
      console.error('Product or product ID is missing:', product);
      return;
    }
    
    // Use stored collection type or determine from category
    let collectionType = product._collectionType || 'products'; // default to products (accessories)
    if (!collectionType && product.category) {
      const cat = product.category.toLowerCase();
      if (cat === 'footwear') collectionType = 'footwear';
      else if (cat === 'fashion') collectionType = 'fashion';
      else if (cat === 'others' || cat === 'other') collectionType = 'others';
      else if (cat === 'accessories' || cat === 'anklet' || cat === 'bracelet' || cat === 'necklace' || cat === 'watch') collectionType = 'products';
    }
    
    const productPath = `/product/${product._id}?collection=${collectionType}`;
    console.log('Navigating to product:', productPath, 'Product:', product);
    
    try {
      navigate(productPath);
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
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
        <p className="text-gray-600 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col cursor-pointer"
              onClick={(e) => handleProductClick(product, e)}
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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

export default ProductsDisplay;
