import { useState } from 'react';
import { images, othersSubcategories } from '../utils/CardsImage';

/* ===== SAME ROUND UI AS FOOTWEAR ===== */
const RoundImage = ({ src, alt, size = 'lg' }) => (
  <div
    className={`
      ${size === 'lg' ? 'w-24 h-24 lg:w-32 lg:h-32' : 'w-16 h-16 sm:w-20 sm:h-20'}
      rounded-full overflow-hidden
      shadow-md hover:shadow-xl
      transition-all duration-300
      bg-white
      border-2 border-accent/30 hover:border-accent
      hover:scale-110 transform
      flex items-center justify-center
      p-3
    `}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain mix-blend-multiply rounded-full"
    />
  </div>
);

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
        { key: 'cluthe', name: 'cluthe', image: othersSubcategories.cluthe },
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
      // Set the category state so products are shown immediately
      onCategoryClick(category.key);
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
    // Clear subcategory when going back
    onSubcategoryClick(null);
  };

  const Wrapper = ({ children }) => (
    <div className="w-full py-2 sm:py-3 md:py-4 pt-12 sm:pt-14 md:pt-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {children}
      </div>
    </div>
  );

  /* ================= SUBCATEGORIES ================= */
  if (selectedMainCategory?.hasSubcategories) {
    return (
      <Wrapper>
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="rounded-2xl shadow-sm border border-primary/5 p-3 lg:p-4">
            <h2 className="text-lg font-bold font-serif text-center mb-4 text-primary">
              {selectedMainCategory.name}
            </h2>

            <div className="flex justify-center gap-6 lg:gap-8">
              {selectedMainCategory.subcategories.map((subcat) => (
                <div
                  key={subcat.key}
                  onClick={() => handleSubcategoryClick(subcat.key)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <RoundImage
                    src={subcat.image || selectedMainCategory.image}
                    alt={subcat.name}
                  />

                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold font-serif text-primary group-hover:text-accent">
                      {subcat.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="rounded-xl shadow-sm border border-primary/5 p-3">
            <h2 className="text-base font-bold font-serif text-center mb-3 text-primary">
              {selectedMainCategory.name}
            </h2>

            <div className="flex justify-center gap-4 sm:gap-6">
              {selectedMainCategory.subcategories.map((subcat) => (
                <div
                  key={subcat.key}
                  onClick={() => handleSubcategoryClick(subcat.key)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <RoundImage
                    src={subcat.image || selectedMainCategory.image}
                    alt={subcat.name}
                    size="sm"
                  />

                  <div className="mt-1 text-center">
                    <h3 className="text-[10px] sm:text-xs font-bold font-serif text-primary group-hover:text-accent">
                      {subcat.name}
                    </h3>
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
        <div className="rounded-2xl shadow-sm border border-primary/5 p-3 lg:p-4">
          <div className="flex justify-center gap-6 lg:gap-8">
            {mainCategories.map((category) => (
              <div
                key={category.key}
                onClick={() => handleMainCategoryClick(category)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <RoundImage src={category.image} alt={category.name} />

                <div className="mt-3 text-center">
                  <h3 className="text-sm lg:text-base font-bold font-serif text-primary group-hover:text-accent">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="rounded-xl shadow-sm border border-primary/5 p-3">
          <div className="grid grid-cols-4 gap-3">
            {mainCategories.map((category) => (
              <div
                key={category.key}
                onClick={() => handleMainCategoryClick(category)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <RoundImage
                  src={category.image}
                  alt={category.name}
                  size="sm"
                />

                <div className="mt-1 text-center">
                  <h3 className="text-[10px] sm:text-xs font-bold font-serif text-primary group-hover:text-accent">
                    {category.name}
                  </h3>
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