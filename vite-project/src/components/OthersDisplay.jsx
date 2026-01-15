import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import othersAPI from '../utils/othersApi';
import AuthModal from './AuthModal';
import { isAuthenticated } from '../utils/auth';

const OthersDisplay = ({ category, subcategory, searchQuery }) => {
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

        // Priority: subcategory > category > all products
        if (subcategory) {
          // Subcategory is selected (either from subcategory click or direct category click like perfume/glasses)
          console.log(`🔍 Fetching products for subcategory: ${subcategory}`);
          try {
            if (searchQuery) {
              response = await othersAPI.searchOthers(searchQuery, subcategory);
            } else {
              response = await othersAPI.filterBySubcategory(subcategory);
            }
            console.log(`✅ Subcategory response:`, response);
            
            // If no products found, try fallback: fetch all and filter client-side
            if (!response.success || !response.data || response.data.length === 0) {
              console.log('🔄 Subcategory filter returned no results, trying fallback...');
              const allResponse = await othersAPI.getOthers({ limit: 500 });
              if (allResponse.success && allResponse.data) {
                const normalizedSubcat = subcategory.toLowerCase().replace(/[\s_]/g, '');
                const filtered = allResponse.data.filter(p => {
                  if (!p.subcategory) return false;
                  const pSubcat = p.subcategory.toLowerCase().replace(/[\s_]/g, '');
                  return pSubcat === normalizedSubcat || pSubcat.includes(normalizedSubcat) || normalizedSubcat.includes(pSubcat);
                });
                response = {
                  success: true,
                  data: filtered
                };
                console.log(`✅ Fallback found ${filtered.length} products for ${subcategory}`);
              }
            }
          } catch (err) {
            console.error('❌ Error fetching subcategory products:', err);
            // Try fallback
            try {
              const allResponse = await othersAPI.getOthers({ limit: 500 });
              if (allResponse.success && allResponse.data) {
                const normalizedSubcat = subcategory.toLowerCase().replace(/[\s_]/g, '');
                const filtered = allResponse.data.filter(p => {
                  if (!p.subcategory) return false;
                  const pSubcat = p.subcategory.toLowerCase().replace(/[\s_]/g, '');
                  return pSubcat === normalizedSubcat || pSubcat.includes(normalizedSubcat) || normalizedSubcat.includes(pSubcat);
                });
                response = {
                  success: true,
                  data: filtered
                };
              }
            } catch (fallbackErr) {
              console.error('❌ Fallback also failed:', fallbackErr);
              response = { success: false, data: [] };
            }
          }
        } else if (category) {
          // Main category selected but no subcategory yet
          if (category === 'perfume') {
            // Perfume directly shows products with subcategory 'perfumes'
            if (searchQuery) {
              response = await othersAPI.searchOthers(searchQuery, 'perfumes');
            } else {
              response = await othersAPI.filterBySubcategory('perfumes');
            }
          } else if (category === 'glasses') {
            // Glasses directly shows products with subcategory 'glasses'
            if (searchQuery) {
              response = await othersAPI.searchOthers(searchQuery, 'glasses');
            } else {
              response = await othersAPI.filterBySubcategory('glasses');
            }
          } else if (category === 'bags') {
            // Bags: Show all bag subcategories (clutch, crossbody, tote_bag)
            console.log('👜 Fetching all bag products...');
            const bagSubcategories = ['clutch', 'crossbody', 'tote_bag', 'tote bag'];
            const allBagProducts = [];
            let foundAny = false;
            
            // Try fetching each subcategory individually
            for (const subcat of bagSubcategories) {
              try {
                let subcatResponse;
                if (searchQuery) {
                  subcatResponse = await othersAPI.searchOthers(searchQuery, subcat);
                } else {
                  subcatResponse = await othersAPI.filterBySubcategory(subcat);
                }
                console.log(`📦 ${subcat} products:`, subcatResponse);
                if (subcatResponse.success && subcatResponse.data && subcatResponse.data.length > 0) {
                  allBagProducts.push(...subcatResponse.data);
                  foundAny = true;
                  console.log(`✅ Found ${subcatResponse.data.length} ${subcat} products`);
                } else {
                  console.log(`⚠️ No ${subcat} products found`);
                }
              } catch (err) {
                console.error(`❌ Error fetching ${subcat} products:`, err);
              }
            }
            
            // If no products found via subcategory filtering, try fetching all and filtering client-side
            if (!foundAny && allBagProducts.length === 0) {
              console.log('🔄 Trying fallback: fetch all products and filter client-side');
              try {
                const allResponse = await othersAPI.getOthers({ limit: 500 });
                if (allResponse.success && allResponse.data) {
                  // Filter products that match bag subcategories (case-insensitive, handle variations)
                  const filtered = allResponse.data.filter(p => {
                    if (!p.subcategory) return false;
                    const subcatLower = p.subcategory.toLowerCase().replace(/[\s_]/g, '');
                    return bagSubcategories.some(bagSub => {
                      const bagSubLower = bagSub.toLowerCase().replace(/[\s_]/g, '');
                      return subcatLower === bagSubLower || subcatLower.includes(bagSubLower) || bagSubLower.includes(subcatLower);
                    });
                  });
                  allBagProducts.push(...filtered);
                  console.log(`✅ Fallback found ${filtered.length} bag products`);
                }
              } catch (err) {
                console.error('❌ Error in fallback fetch:', err);
              }
            }
            
            // Remove duplicates based on _id
            const uniqueProducts = Array.from(
              new Map(allBagProducts.map(p => [p._id, p])).values()
            );
            
            console.log(`🎯 Total unique bag products: ${uniqueProducts.length}`);
            
            response = {
              success: true,
              data: uniqueProducts
            };
          } else if (category === 'skincare') {
            // Skincare: Show all skincare subcategories
            if (searchQuery) {
              response = await othersAPI.searchOthers(searchQuery);
              const skincareSubcategories = ['cleanser', 'moisturizer', 'facewash', 'sunscreen'];
              if (response.success && response.data) {
                response.data = response.data.filter(p => 
                  skincareSubcategories.some(sub => 
                    p.subcategory?.toLowerCase().includes(sub.toLowerCase())
                  )
                );
              }
            } else {
              const allResponse = await othersAPI.getOthers({ limit: 200 });
              if (allResponse.success && allResponse.data) {
                const skincareSubcategories = ['cleanser', 'moisturizer', 'facewash', 'sunscreen'];
                response = {
                  success: true,
                  data: allResponse.data.filter(p => 
                    skincareSubcategories.some(sub => 
                      p.subcategory?.toLowerCase().includes(sub.toLowerCase())
                    )
                  )
                };
              } else {
                response = { success: true, data: [] };
              }
            }
          } else {
            // For other categories, wait for subcategory selection
            response = { success: true, data: [] };
          }
        } else {
          // No filter - show all products
          if (searchQuery) {
            response = await othersAPI.searchOthers(searchQuery);
          } else {
            response = await othersAPI.getOthers({ limit: 50 });
          }
        }

        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError('Failed to fetch products');
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
  }, [category, subcategory, searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}?collection=others`);
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

export default OthersDisplay;
