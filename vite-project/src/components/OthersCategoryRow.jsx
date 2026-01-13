import { useState } from 'react';
import { images, othersSubcategories } from '../utils/CardsImage';

const OthersCategoryRow = ({ onCategoryClick, onSubcategoryClick }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  const mainCategories = [
    {
      key: 'skincare',
      name: 'Skincare',
      image: images.others.Skincare,
      hasSubcategories: true,
      subcategories: [
         { key: 'cleanser', name: 'Cleanser', image: othersSubcategories.skincare },
    { key: 'moisturizer', name: 'Moisturizer', image: othersSubcategories.moisturizer },
    { key: 'facewash', name: 'Facewash', image: othersSubcategories.facewash },
    { key: 'sunscreen', name: 'Sunscreen', image: othersSubcategories.sunscreen }
      ]
    },
    {
      key: 'bags',
      name: 'Bags',
      image: images.others.Bags,
      hasSubcategories: true,
      subcategories: [
        { key: 'clutch', name: 'Clutch', image: othersSubcategories.clutch },
    { key: 'crossbody', name: 'Crossbody', image: othersSubcategories.crossbody },
    { key: 'tote_bag', name: 'Tote Bag', image: othersSubcategories.totebag }
      ]
    },
    {
      key: 'glasses',
      name: 'Glasses',
      image: images.others.Glasses,
      hasSubcategories: false
    },
    {
      key: 'perfume',
      name: 'Perfume',
      image: images.others.Perfumes,
      hasSubcategories: false
    }
  ];

  const handleMainCategoryClick = (category) => {
    if (category.hasSubcategories) {
      // Show subcategories
      setSelectedMainCategory(category);
    } else {
      // Directly filter products (perfume or glasses)
      if (category.key === 'perfume') {
        onSubcategoryClick('perfumes');
      } else if (category.key === 'glasses') {
        onSubcategoryClick('glasses');
      }
      setSelectedMainCategory(null);
    }
  };

  const handleSubcategoryClick = (subcategoryKey) => {
    onSubcategoryClick(subcategoryKey);
    setSelectedMainCategory(null);
  };

  const handleBack = () => {
    setSelectedMainCategory(null);
    onCategoryClick(null);
  };

  // Show subcategories if a main category with subcategories is selected
  if (selectedMainCategory && selectedMainCategory.hasSubcategories) {
    return (
      <div className="w-full py-3 sm:py-4 md:py-6 relative z-0" style={{
        background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)'
      }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-4 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            ← 
          </button>

          {/* Subcategories */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-4 lg:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {selectedMainCategory.name}
              </h2>
              <div className="flex items-center justify-center gap-3 lg:gap-4">
                {selectedMainCategory.subcategories.map((subcat) => (
                  <div
                    key={subcat.key}
                    onClick={() => handleSubcategoryClick(subcat.key)}
                    className="flex-1 max-w-xs cursor-pointer group"
                  >
                    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                      <div className="w-full flex items-center justify-center p-3 lg:p-4 bg-gradient-to-br from-gray-50 to-white">
                        <div className="w-24 h-24 lg:w-28 lg:h-28">
                          <img
                            src={subcat.image || selectedMainCategory.image}

                            alt={subcat.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-2 lg:p-3 text-center bg-white">
                        <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {subcat.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Subcategories */}
          <div className="md:hidden">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
                {selectedMainCategory.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {selectedMainCategory.subcategories.map((subcat) => (
                  <div
                    key={subcat.key}
                    onClick={() => handleSubcategoryClick(subcat.key)}
                    className="cursor-pointer group"
                  >
                    <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                      <div className="w-full flex items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-white">
                        <div className="w-12 h-12 sm:w-16 sm:h-16">
                          <img
src={subcat.image || selectedMainCategory.image}
                            alt={subcat.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-1 sm:p-2 text-center bg-white">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors leading-tight">
                          {subcat.name}
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
  }

  // Show main categories
  return (
    <div className="w-full py-3 sm:py-4 md:py-6 relative z-0" style={{
      background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)'
    }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop: Single Row with Outer Box */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-4 lg:p-6">
            <div className="flex items-center justify-center gap-3 lg:gap-4">
              {mainCategories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => handleMainCategoryClick(category)}
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
              {mainCategories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => handleMainCategoryClick(category)}
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

export default OthersCategoryRow;
