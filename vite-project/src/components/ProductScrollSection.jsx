import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductScrollSection = ({ title, products, collectionType }) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector('.product-card')?.offsetWidth || 0;
      const gap = 20;
      const scrollAmount = (cardWidth + gap) * 2;

      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}?collection=${collectionType}`);
  };

  if (!products || products.length === 0) {
    return null;
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]"
        />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFE4E1]"
        />
      );
    }

    return stars;
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B4A6B] mb-2 tracking-tight">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent"></div>
          </div>

          <p
            onClick={() =>
              navigate(`/${collectionType === 'discount' ? 'sale' : collectionType}`)
            }
            className="text-[#8B4A6B] hover:text-[#FF69B4] font-semibold text-sm sm:text-base uppercase tracking-wider transition-colors duration-200 border-b-2 border-transparent hover:border-[#FF69B4] cursor-pointer"
          >
            View All
          </p>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:scale-110 border border-[#FFB6C1]/30"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B4A6B]" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
          >
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="product-card flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-52 md:w-56 lg:w-64 cursor-pointer group"
              >
                <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">

                  {/* ✅ ONLY CHANGE IS HERE */}
                  <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] overflow-hidden relative">
                    {title === "Sale" && (
                      <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-[#FF69B4] to-[#FFB6C1] text-white px-3 py-1 rounded-full shadow-lg animate-pulse">
                        <span className="text-xs font-bold uppercase">Sale</span>
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-half h-half object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-3 sm:p-5 bg-white">
                    <h3 className="text-xs sm:text-base font-bold text-[#8B4A6B] mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-1 sm:mb-2">
                      {renderStars(product.stars || 0)}
                      <span className="text-[10px] sm:text-xs text-[#8B4A6B]/70 ml-1">
                        ({product.stars || 0})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.discounted_price ? (
                        <>
                          <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                            ₹{product.discounted_price}
                          </span>
                          <span className="text-[10px] sm:text-sm text-[#8B4A6B]/50 line-through">
                            ₹{product.original_price || product.price || 0}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                          ₹{product.original_price || product.price || 0}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:scale-110 border border-[#FFB6C1]/30"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#8B4A6B]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductScrollSection;
