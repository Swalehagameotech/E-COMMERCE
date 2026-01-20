import { useState, useEffect, useMemo } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

const FilterSidebar = ({ products, onFilterChange, onClose, isOpen, categoryName = 'Product' }) => {
  const [priceRange, setPriceRange] = useState(['', '']);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // Format category name: capitalize first letter and handle multiple words
  const formatCategoryName = (name) => {
    if (!name) return 'Product';
    return name
      .split(/[\s-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const displayCategoryName = formatCategoryName(categoryName);

  // Calculate actual min and max prices from products
  const minMaxPrices = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 50000 };
    const prices = products
      .map(p => p.discounted_price || p.price || 0)
      .filter(p => p > 0);
    if (prices.length === 0) return { min: 0, max: 50000 };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { 
      min: Math.floor(min / 100) * 100, // Round down to nearest 100
      max: Math.ceil(max / 100) * 100   // Round up to nearest 100
    };
  }, [products]);

  const maxPrice = minMaxPrices.max;

  // Set initial price range to actual min/max when products change
  useEffect(() => {
    if (products.length > 0 && minMaxPrices.min > 0 && minMaxPrices.max > 0) {
      setPriceRange([minMaxPrices.min.toString(), minMaxPrices.max.toString()]);
    }
  }, [minMaxPrices.min, minMaxPrices.max, products.length]); // Update when min/max prices change

  const availableBrands = useMemo(() => {
    const brands = new Set();
    products.forEach(p => {
      if (p.brand_name || p.brand) brands.add(p.brand_name || p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  const discountOptions = useMemo(() => {
    const discounts = new Set();
    products.forEach(p => {
      if (p.discounted_price && p.price) {
        const discount = Math.round(((p.price - p.discounted_price) / p.price) * 100);
        if (discount >= 10) {
          if (discount >= 30) discounts.add(30);
          else if (discount >= 20) discounts.add(20);
          else discounts.add(10);
        }
      } else if (p.discount_percent >= 10) {
        if (p.discount_percent >= 30) discounts.add(30);
        else if (p.discount_percent >= 20) discounts.add(20);
        else discounts.add(10);
      }
    });
    return Array.from(discounts).sort((a, b) => b - a);
  }, [products]);

  useEffect(() => {
    onFilterChange({
      priceRange:
        priceRange[0] || priceRange[1]
          ? [Number(priceRange[0]) || 0, Number(priceRange[1]) || maxPrice]
          : ['', ''],
      selectedDiscounts,
      selectedBrands,
      sortBy
    });
  }, [priceRange, selectedDiscounts, selectedBrands, sortBy, onFilterChange, maxPrice]);

  const handleReset = () => {
    setPriceRange(['', '']);
    setSelectedDiscounts([]);
    setSelectedBrands([]);
    setSortBy('newest');
  };

  const toggleDiscount = (discount) => {
    setSelectedDiscounts(prev =>
      prev.includes(discount) ? prev.filter(d => d !== discount) : [...prev, discount]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const hasActiveFilters =
    selectedDiscounts.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] ||
    priceRange[1];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[90vw] sm:w-[420px] bg-white shadow-2xl z-50
          lg:sticky lg:top-24 lg:w-full lg:max-w-[320px] lg:h-[calc(100vh-6rem)]
          lg:border-r lg:border-gray-200 lg:shadow-lg lg:z-30
          overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          no-scrollbar
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 lg:p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="w-full mb-6 py-2 text-sm font-medium border border-primary/30 rounded-lg hover:bg-primary/5"
            >
              Reset Filters
            </button>
          )}

          <div className="space-y-7">
            {/* Sort */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-accent"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">{displayCategoryName} Min</label>
                  <input
                    type="number"
                    placeholder={minMaxPrices.min > 0 ? minMaxPrices.min.toString() : "Min"}
                    value={priceRange[0]}
                    onChange={e => setPriceRange([e.target.value, priceRange[1]])}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">{displayCategoryName} Max</label>
                  <input
                    type="number"
                    placeholder={minMaxPrices.max > 0 ? minMaxPrices.max.toString() : "Max"}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], e.target.value])}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
              {/* Show actual price range below inputs */}
              {products.length > 0 && minMaxPrices.min > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Price range: ₹{minMaxPrices.min.toLocaleString()} - ₹{minMaxPrices.max.toLocaleString()}
                </p>
              )}
            </div>

            {/* Discount */}
            {discountOptions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Discount</h3>
                <div className="space-y-2">
                  {discountOptions.map(d => (
                    <label key={d} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDiscounts.includes(d)}
                        onChange={() => toggleDiscount(d)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="text-sm">{d}% or more</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brand */}
            {availableBrands.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3">Brand</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {availableBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="text-sm capitalize">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
