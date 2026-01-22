import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fashionAPI from '../utils/fashionApi';
import AuthModal from './AuthModal';
import FilterSidebar from './FilterSidebar';
import FilterButton from './FilterButton';
import { useProductFilters } from '../utils/useProductFilters';

const FashionDisplay = ({ category, searchQuery }) => {
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

  const navigate = useNavigate();

  /* ---------------- APPLY FILTERS ---------------- */
  const filtered = useProductFilters(products, filters);

  useEffect(() => {
    setFilteredProducts(filtered);
  }, [filtered]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setProducts([]);

      try {
        let response;

        if (searchQuery?.trim()) {
          response = await fashionAPI.searchFashion(searchQuery);
        } else if (category?.trim()) {
          console.log('🔍 FashionDisplay - Fetching products for category:', category);
          response = await fashionAPI.filterByCategory(category);
          console.log('🔍 FashionDisplay - API response:', response);
        } else {
          response = await fashionAPI.getFashion({ limit: 50 });
        }

        if (!isMounted) return;
        
        console.log('🔍 FashionDisplay - Response success:', response.success);
        console.log('🔍 FashionDisplay - Products count:', response.data?.length || 0);

        if (response.success) {
          let productsToShow = response.data || [];

          // Backend already filters by subcategory, so no need for additional client-side filtering
          // Just use the products returned by the backend
          setProducts(productsToShow);
        } else {
          setError('Failed to fetch fashion');
        }
      } catch (err) {
        setError('Error loading fashion. Please check backend.');
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProducts();
    return () => (isMounted = false);
  }, [category, searchQuery]);

  /* ---------------- RESET FILTERS ---------------- */
  useEffect(() => {
    setFilters({
      priceRange: ['', ''],
      selectedDiscounts: [],
      selectedBrands: [],
      sortBy: 'newest'
    });
  }, [category, searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}?collection=fashion`);
  };

  const filterCount =
    filters.selectedDiscounts.length +
    filters.selectedBrands.length +
    (filters.priceRange[0] || filters.priceRange[1] ? 1 : 0);

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin h-12 w-12 mx-auto border-b-2 border-accent rounded-full" />
        <p className="mt-4 text-gray-600">Loading fashion...</p>
      </div>
    );
  }

  if (error) {
    return <p className="py-12 text-center text-red-600">{error}</p>;
  }

  if (!products.length) {
    return <p className="py-12 text-center text-gray-600">No fashion found.</p>;
  }

  return (
    <>
      <div className="px-2 sm:px-4 lg:px-6 py-6 max-w-7xl mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between mb-4">
          <FilterButton
            onClick={() => setShowFilters(true)}
            filterCount={filterCount}
          />
          <span className="text-sm text-gray-500">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-[20%] sticky top-24">
            <FilterSidebar
              products={products}
              onFilterChange={setFilters}
              isOpen
              categoryName={category || 'Fashion'}
            />
          </div>

          {/* Products */}
          <div className="w-full lg:w-[80%]">
            {/* Mobile Drawer */}
            <div className="lg:hidden">
              <FilterSidebar
                products={products}
                onFilterChange={setFilters}
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                categoryName={category || 'Fashion'}
              />
            </div>

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
                      alt={product.brand}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-base font-serif text-primary mb-1 line-clamp-1 text-center ">
                    {product.brand}
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
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: ['', ''],
                      selectedDiscounts: [],
                      selectedBrands: [],
                      sortBy: 'newest'
                    })
                  }
                  className="mt-2 text-accent font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default FashionDisplay;
