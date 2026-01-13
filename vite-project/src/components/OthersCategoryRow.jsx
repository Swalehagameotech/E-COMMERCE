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
      setSelectedMainCategory(category);
    } else {
      onSubcategoryClick(category.key === 'perfume' ? 'perfumes' : 'glasses');
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

  const Wrapper = ({ children }) => (
    <div
      className="w-full py-2 sm:py-3 md:py-4 relative z-0"
      style={{ background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)' }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {children}
      </div>
    </div>
  );

  /* ================= SUBCATEGORIES ================= */
  if (selectedMainCategory?.hasSubcategories) {
    return (
      <Wrapper>
        <button
          onClick={handleBack}
          className="mb-2 text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back
        </button>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-3 lg:p-4">
            <h2 className="text-lg font-bold text-center mb-3">
              {selectedMainCategory.name}
            </h2>

            <div className="flex justify-center gap-3">
              {selectedMainCategory.subcategories.map((subcat) => (
                <div
                  key={subcat.key}
                  onClick={() => handleSubcategoryClick(subcat.key)}
                  className="flex-1 max-w-xs cursor-pointer group"
                >
                  <div className="rounded-lg shadow-md hover:shadow-lg transition bg-white">
                    <div className="flex justify-center p-2">
                      <div className="w-20 h-20 lg:w-24 lg:h-24">
                        <img
                          src={subcat.image || selectedMainCategory.image}
                          alt={subcat.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="py-1 text-center">
                      <h3 className="text-sm font-semibold">
                        {subcat.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-3">
            <h2 className="text-base font-bold text-center mb-2">
              {selectedMainCategory.name}
            </h2>

            <div className="grid grid-cols-4 gap-2">
              {selectedMainCategory.subcategories.map((subcat) => (
                <div
                  key={subcat.key}
                  onClick={() => handleSubcategoryClick(subcat.key)}
                  className="cursor-pointer"
                >
                  <div className="rounded-lg shadow bg-white">
                    <div className="flex justify-center p-1">
                      <div className="w-14 h-14">
                        <img
                          src={subcat.image || selectedMainCategory.image}
                          alt={subcat.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-center py-0.5">
                      <h3 className="text-xs font-semibold leading-tight">
                        {subcat.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  /* ================= MAIN CATEGORIES ================= */
  return (
    <Wrapper>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-3 lg:p-4">
          <div className="flex justify-center gap-3">
            {mainCategories.map((category) => (
              <div
                key={category.key}
                onClick={() => handleMainCategoryClick(category)}
                className="flex-1 max-w-xs cursor-pointer"
              >
                <div className="rounded-lg shadow-md hover:shadow-lg bg-white transition">
                  <div className="flex justify-center p-2">
                    <div className="w-20 h-20 lg:w-24 lg:h-24">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="py-1 text-center">
                    <h3 className="text-sm font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-3">
          <div className="grid grid-cols-4 gap-2">
            {mainCategories.map((category) => (
              <div
                key={category.key}
                onClick={() => handleMainCategoryClick(category)}
                className="cursor-pointer"
              >
                <div className="rounded-lg shadow bg-white">
                  <div className="flex justify-center p-1">
                    <div className="w-14 h-14">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center py-0.5">
                    <h3 className="text-xs font-semibold leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OthersCategoryRow;
