import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import othersAPI from '../utils/othersApi';
import AuthModal from './AuthModal';
import FilterSidebar from './FilterSidebar';
import FilterButton from './FilterButton';
import { useProductFilters } from '../utils/useProductFilters';

const OthersDisplay = ({ category, subcategory, searchQuery }) => {
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
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      if (isMounted) setProducts([]);

      try {
        let response;

        if (searchQuery) {
          response = await othersAPI.searchOthers(searchQuery);
        } else if (subcategory) {
          response = await othersAPI.filterBySubcategory(subcategory);
        } else if (category) {
          // When category is selected (like "skincare" or "bags"), fetch products filtered by category
          response = await othersAPI.getOthers({ category, limit: 200 });
        } else {
          response = await othersAPI.getOthers({ limit: 50 });
        }

        if (!isMounted) return;

        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error loading products');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => (isMounted = false);
  }, [category, subcategory, searchQuery]);

  useEffect(() => {
    setFilters({
      priceRange: ['', ''],
      selectedDiscounts: [],
      selectedBrands: [],
      sortBy: 'newest'
    });
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

  const filterCount =
    filters.selectedDiscounts.length +
    filters.selectedBrands.length +
    (filters.priceRange[0] || filters.priceRange[1] ? 1 : 0);

  return (
    <>
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        <div className="max-w-7xl mx-auto">

          {/* MOBILE FILTER BUTTON */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <FilterButton
              onClick={() => setShowFilters(true)}
              isActive={showFilters}
              filterCount={filterCount}
            />
            <span className="text-sm text-gray-600">
              {filteredProducts.length} products
            </span>
          </div>

          {/* MAIN LAYOUT */}
          <div className="flex gap-6 items-start">

            {/* FILTER SIDEBAR – DESKTOP */}
            <aside className="hidden lg:block w-[22%] sticky top-24 flex-shrink-0">
              <FilterSidebar
                products={products}
                onFilterChange={setFilters}
                isOpen={true}
                categoryName={subcategory || category || 'Others'}
              />
            </aside>

            {/* PRODUCTS */}
            <div className="w-full lg:w-[78%]">

              {/* MOBILE FILTER DRAWER */}
              <div className="lg:hidden">
                <FilterSidebar
                  products={products}
                  onFilterChange={setFilters}
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                  categoryName={subcategory || category || 'Others'}
                />
              </div>

              {/* GRID */}
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
                        alt={product.brand_name || product.brand || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-base font-serif text-primary mb-1 line-clamp-1 text-center">
                      {product.brand_name || product.brand || product.name}
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

              {/* NO RESULTS */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-2">
                    No products match your filters
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        priceRange: ['', ''],
                        selectedDiscounts: [],
                        selectedBrands: [],
                        sortBy: 'newest'
                      })
                    }
                    className="text-accent font-medium"
                  >
                    Clear filters
                  </button>
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

export default OthersDisplay;
