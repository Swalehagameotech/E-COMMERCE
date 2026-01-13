import { images } from '../utils/CardsImage';

const FashionCategoryRow = ({ onCategoryClick }) => {
  const categories = [
    {
      key: 'comfy',
      name: 'Comfy',
      image: images.fashion.comfy
    },
    {
      key: 'kurta',
      name: 'Kurta',
      image: images.fashion.kurta
    },
    {
      key: 'belts',
      name: 'Belts',
      image: images.fashion.Belts
    },
    {
      key: 'scarf',
      name: 'Scarf',
      image: images.fashion.scarf
    }
  ];

  return (
    <div className="w-full py-3 sm:py-4 md:py-6 relative z-0" style={{
      background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)'
    }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop: Single Row with Outer Box */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-4 lg:p-6">
            <div className="flex items-center justify-center gap-3 lg:gap-4">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="flex-1 max-w-xs cursor-pointer group"  
                >
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                    <div className="w-full flex items-center justify-center p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-white">
                      <div className="w-24 h-24 lg:w-28 lg:h-28">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-2 lg:p-3 text-center bg-white">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Fixed Grid Layout */}
        <div className="md:hidden">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="cursor-pointer group"
                >
                  <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="w-full flex items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white">
                      <div className="w-12 h-12 sm:w-16 sm:h-16">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-1 sm:p-2 text-center bg-white">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionCategoryRow;
