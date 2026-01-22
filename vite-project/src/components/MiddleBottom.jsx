import { useNavigate } from 'react-router-dom';
import { images } from '../utils/CardsImage';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const MiddleBottom = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const handleCategoryClick = (categoryKey) => {
    if (categoryKey === 'fashion') {
      navigate('/fashion');
    } else if (categoryKey === 'accessories') {
      navigate('/products');
    } else if (categoryKey === 'footwears') {
      navigate('/footwear');
    } else if (categoryKey === 'others') {
      navigate('/others');
    }
  };

  const scroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.category-card')?.offsetWidth || 0;
      const gap = 16; // gap between cards
      scrollContainerRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
  };

  const categoryLabels = {
    fashion: 'Fashion',
    accessories: 'Accessories',
    footwears: 'Footwears',
    others: 'Others'
  };

  // Define the order of categories
  const categoryOrder = ['fashion', 'accessories', 'footwears', 'others'];
  
  // Sort images based on the defined order
  const sortedCategories = categoryOrder
    .filter(key => images[key]) // Only include categories that exist in images
    .map(key => [key, images[key]]);

  const formatTitle = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  const placeholderImage =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <div className="w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8B4A6B] mb-4">Shop by Category</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent mx-auto"></div>
        </div>

        {/* Mobile: Horizontal Scroll with Arrow - One card at a time centered */}
        <div className="lg:hidden relative px-2">
          <div 
            ref={scrollContainerRef}
            className="flex gap-7 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-2"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              scrollPaddingLeft: '0.5rem'
            }}
          >
            {sortedCategories.map(([categoryKey, items]) => (
              <div
                key={categoryKey}
                onClick={() => handleCategoryClick(categoryKey)}
                className="category-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-[#FFE4E1] p-6 hover:scale-105 transform w-[calc(100%-1rem)] flex-shrink-0 snap-center"
              >
                {/* Category Title */}
                <h3 className="text-xl font-serif font-bold text-center mb-6 text-[#8B4A6B]">
                  {categoryLabels[categoryKey] || formatTitle(categoryKey)}
                </h3>

                {/* Sub-boxes */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(items).map(([itemKey, imageUrl]) => (
                    <div key={itemKey} className="flex flex-col items-center">
                      <div className="w-full h-24 mb-3 overflow-hidden  rounded-lg flex items-center justify-center p-2">
                        {imageUrl && imageUrl.trim() !== '' ? (
                          <img
                            src={imageUrl}
                            alt={formatTitle(itemKey)}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = placeholderImage;
                            }}
                          />
                        ) : (
                          <img
                            src={placeholderImage}
                            alt="Placeholder"
                            className="w-full h-full object-cover opacity-50"
                          />
                        )}
                      </div>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#8B4A6B]/70">
                        {formatTitle(itemKey)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Arrow - Right side only */}
          <button
            onClick={scroll}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-10 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#8B4A6B]" />
          </button>
        </div>

        {/* Desktop: Grid Layout (unchanged) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {sortedCategories.map(([categoryKey, items]) => (
            <div
              key={categoryKey}
              onClick={() => handleCategoryClick(categoryKey)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-[#FFE4E1] p-6 hover:scale-105 transform"
            >
              {/* Category Title */}
              <h3 className="text-xl font-serif font-bold text-center mb-6 text-[#8B4A6B]">
                {categoryLabels[categoryKey] || formatTitle(categoryKey)}
              </h3>

              {/* Sub-boxes */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(items).map(([itemKey, imageUrl]) => (
                  <div key={itemKey} className="flex flex-col items-center">
                    <div className="w-full h-24 mb-3 overflow-hidden rounded-lg flex items-center justify-center p-2">
                      {imageUrl && imageUrl.trim() !== '' ? (
                        <img
                          src={imageUrl}
                          alt={formatTitle(itemKey)}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = placeholderImage;
                          }}
                        />
                      ) : (
                        <img
                          src={placeholderImage}
                          alt="Placeholder"
                          className="w-full h-full object-cover opacity-50"
                        />
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold text-[#8B4A6B]/70">
                      {formatTitle(itemKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>


    </div>
  );
};

export default MiddleBottom;