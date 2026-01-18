import { images } from '../utils/CardsImage';

const CategoryRow = ({ onCategoryClick }) => {
  const categories = [
    { key: 'anklet', name: 'Anklet', image: images.accessories.Anklet },
    { key: 'bracelet', name: 'Bracelet', image: images.accessories.bracelte },
    { key: 'necklace', name: 'Necklace', image: images.accessories.neklaces },
    { key: 'watch', name: 'Watches', image: images.accessories.watches }
  ];

  return (
    <div className="w-full py-2 sm:py-3 md:py-4 pt-12 sm:pt-14 md:pt-16 relative z-0 bg-secondary">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="rounded-2xl shadow-sm border border-primary/5 p-3 lg:p-4">
            <div className="flex justify-center gap-6 lg:gap-8">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Round Image Container */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border-2 border-accent/30 hover:border-accent hover:scale-110 transform flex items-center justify-center p-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply rounded-full"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="mt-3 text-center">
                    <h3 className="text-sm lg:text-base font-bold font-serif text-primary group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="md:hidden">
          <div className="rounded-xl shadow-sm border border-primary/5 p-3">
            <div className="grid grid-cols-4 gap-3">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Round Image Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md bg-white transition-all duration-300 border-2 border-accent/30 hover:border-accent flex items-center justify-center p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply rounded-full"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="mt-2 text-center">
                    <h3 className="text-[10px] sm:text-xs font-bold font-serif text-primary leading-tight group-hover:text-accent transition-colors">
                      {category.name}
                    </h3>
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

export default CategoryRow;