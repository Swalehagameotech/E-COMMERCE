import { useNavigate } from 'react-router-dom';
import { images } from '../utils/CardsImage';

const MiddleBottom = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryKey) => {
    // Navigate to products page when Accessories is clicked
    if (categoryKey === 'accessories') {
      navigate('/products');
    }
  };
  // Category labels mapping
  const categoryLabels = {
    accessories: 'Accessories',
    footwears: 'Footwears',
    fashion: 'Fashion',
    others: 'Others'
  };

  // Format key name to title (capitalize first letter)
  const formatTitle = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  // Placeholder image URL
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid: 1 column mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {Object.entries(images).map(([categoryKey, items]) => (
            <div
              key={categoryKey}
              onClick={() => handleCategoryClick(categoryKey)}
              className={`bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300 w-full bg-gray-50 hover:bg-gray-100 hover:scale-105 hover:shadow-md transition-all duration-300 ${categoryKey === 'accessories' ? 'cursor-pointer' : ''}`}
            >
              {/* Category Title */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                {categoryLabels[categoryKey] || formatTitle(categoryKey)}
              </h2>

              {/* Sub-boxes in 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {Object.entries(items).map(([itemKey, imageUrl]) => (
                  <div
                    key={itemKey}
                    className="flex flex-col items-center p-2 sm:p-3 rounded-lg  cursor-pointer"
                  >
                    {/* Image Container with Responsive Height */}
                    <div className="w-full h-20 sm:h-24 md:h-28 mb-1.5 sm:mb-2 flex items-center justify-center overflow-hidden rounded-md bg-gray-200">
                      {imageUrl && imageUrl.trim() !== '' ? (
                        <img
                          src={imageUrl}
                          alt={formatTitle(itemKey)}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = placeholderImage;
                          }}
                        />
                      ) : (
                        <img
                          src={placeholderImage}
                          alt="Placeholder"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>

                    {/* Title Text */}
                    <p className="text-xs sm:text-sm font-medium text-gray-700 text-center break-words">
                      {formatTitle(itemKey)}
                    </p>
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
