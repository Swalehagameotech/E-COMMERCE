import { useNavigate } from 'react-router-dom';
import { images } from '../utils/CardsImage';

const MiddleBottom = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryKey) => {
    if (categoryKey === 'accessories') {
      navigate('/products');
    } else if (categoryKey === 'footwears') {
      navigate('/footwear');
    } else if (categoryKey === 'fashion') {
      navigate('/fashion');
    } else if (categoryKey === 'others') {
      navigate('/others');
    }
  };

  const categoryLabels = {
    accessories: 'Accessories',
    footwears: 'Footwears',
    fashion: 'Fashion',
    others: 'Others'
  };

  const formatTitle = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  const placeholderImage =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <div className="w-full bg-white px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {Object.entries(images).map(([categoryKey, items]) => (
            <div
              key={categoryKey}
              onClick={() => handleCategoryClick(categoryKey)}
              className="group bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8] rounded-xl shadow-lg p-4
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Category Title */}
              <h2
                className="text-xl sm:text-2xl font-bold text-center mb-4
                           bg-gradient-to-r from-[#8D493A] via-gray-700 to-[#8D493A]
                           bg-clip-text text-transparent tracking-wide"
              >
                {categoryLabels[categoryKey] || formatTitle(categoryKey)}
              </h2>

              {/* Decorative underline */}
              <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-[#E5989B] mx-auto mb-5 rounded-full group-hover:w-20 transition-all duration-300" />

              {/* Sub-boxes */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(items).map(([itemKey, imageUrl]) => (
                  <div
                    key={itemKey}
                    className="flex flex-col items-center p-3 rounded-lg
                               hover:bg-white hover:shadow-md
                               transition-all duration-300"
                  >
                    <div className="w-full h-20 sm:h-24 md:h-28 mb-2 flex items-center justify-center
                                    overflow-hidden rounded-lg bg-gray-100">
                      {imageUrl && imageUrl.trim() !== '' ? (
                        <img
                          src={imageUrl}
                          alt={formatTitle(itemKey)}
                          className="w-full h-full object-contain
                                     group-hover:scale-105 transition-transform duration-300"
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

                    <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center tracking-wide">
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
