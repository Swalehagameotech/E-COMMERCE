import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SuggestionsSection = ({ products, collectionType }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}?collection=${collectionType}`);
    window.scrollTo(0, 0);
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]" />
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFE4E1]" />
      );
    }
    return stars;
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 py-12 sm:py-16 bg-gradient-to-b from-[#FFF0F5] via-[#FFE4E1] to-[#FFF0F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B4A6B] mb-3 tracking-tight">
            You May Also Like
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent mx-auto"></div>
        </div>
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:scale-110 border border-[#FFB6C1]/30"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B4A6B]" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((item) => (
              <div
                key={item._id}
                onClick={() => handleProductClick(item._id)}
                className="flex-shrink-0 w-48 sm:w-52 md:w-56 lg:w-64 cursor-pointer group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#FFE4E1] hover:border-[#FFB6C1] hover:scale-[1.02]">
                  {/* Product Image */}
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-5 bg-white">
                    {/* Product Name */}
                    <h3 className="text-sm sm:text-base font-bold text-[#8B4A6B] mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-[#FF69B4] transition-colors duration-200">
                      {item.name}
                    </h3>

                    {/* Stars Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(item.stars || 0)}
                      <span className="text-xs text-[#8B4A6B]/70 ml-1">({item.stars || 0})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                      {item.discounted_price ? (
                        <>
                          <span className="text-base sm:text-lg font-bold text-[#8B4A6B]">
                            ₹{item.discounted_price}
                          </span>
                          <span className="text-xs sm:text-sm text-[#8B4A6B]/50 line-through">
                            ₹{item.original_price || item.price || 0}
                          </span>
                        </>
                      ) : (
                        <span className="text-base sm:text-lg font-bold text-[#8B4A6B]">
                          ₹{item.original_price || item.price || 0}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#8B4A6B]/70 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                      {item.description || item.brand_name || 'Beautiful product for you'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:scale-110 border border-[#FFB6C1]/30"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B4A6B]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuggestionsSection;
