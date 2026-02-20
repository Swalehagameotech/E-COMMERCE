import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import footwearAPI from '../utils/footwearApi';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';
import FilterSidebar from './FilterSidebar';
import FilterButton from './FilterButton';
import { useProductFilters } from '../utils/useProductFilters';

const FootwearDisplay = ({ category, searchQuery }) => {
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
      if (isMounted) setProducts([]);

      try {
        let response;

        if (searchQuery?.trim()) {
          response = await footwearAPI.searchFootwear(searchQuery);
        } else if (category?.trim()) {
          response = await footwearAPI.filterByCategory(category);
        } else {
          response = await footwearAPI.getFootwear({ limit: 50 });
        }

        if (!isMounted) return;

        if (response.success) {
          let data = response.data || [];

          if (category) {
            const map = {
              sandal: 'sandals',
              sandals: 'sandals',
              boot: 'boots',
              boots: 'boots',
              flat: 'flats',
              flats: 'flats',
              sneaker: 'sneakers',
              sneakers: 'sneakers'
            };

            const key = map[category.toLowerCase()] || category.toLowerCase();
            data = data.filter(
              p => p.subcategory?.toLowerCase() === key
            );
          }

          setProducts(data);
        } else {
          setError('Failed to fetch footwear');
        }
      } catch (err) {
        setError('Backend not reachable');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => (isMounted = false);
  }, [category, searchQuery]);

  /* ---------------- RESET FILTERS WHEN CATEGORY CHANGES ---------------- */
  useEffect(() => {
    setFilters({
      priceRange: ['', ''],
      selectedDiscounts: [],
      selectedBrands: [],
      sortBy: 'newest'
    });
  }, [category, searchQuery]);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}?collection=footwear`);
  };

  const filterCount =
    filters.selectedDiscounts.length +
    filters.selectedBrands.length +
    ((filters.priceRange[0] || filters.priceRange[1]) ? 1 : 0);

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-primary mx-auto rounded-full" />
        <p className="mt-4 text-gray-500">Loading footwear…</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 py-10">{error}</p>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-6">
        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <FilterButton
            onClick={() => setShowFilters(true)}
            isActive={showFilters}
            filterCount={filterCount}
          />
          <span className="text-sm text-gray-500">
            {filteredProducts.length} items
          </span>
        </div>

        <div className="flex gap-6 items-start">
          {/* ---------------- SIDEBAR (DESKTOP) ---------------- */}
          <aside className="hidden lg:block w-[22%] sticky top-24">
            <FilterSidebar
              products={products}
              onFilterChange={setFilters}
              isOpen
              collection="footwear"
              activeCategory={category}
              categoryName={category || 'Footwear'}
            />
          </aside>

          {/* ---------------- PRODUCTS ---------------- */}
          <section className="w-full lg:w-[78%]">
            {/* MOBILE SIDEBAR */}
            <div className="lg:hidden">
              <FilterSidebar
                products={products}
                onFilterChange={setFilters}
                onClose={() => setShowFilters(false)}
                isOpen={showFilters}
                collection="footwear"
                activeCategory={category}
                categoryName={category || 'Footwear'}
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
            {filteredProducts.length === 0 && products.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No products match your filters</p>
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
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default FootwearDisplay;
