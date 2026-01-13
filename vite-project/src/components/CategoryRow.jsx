import { images } from '../utils/CardsImage';

const CategoryRow = ({ onCategoryClick }) => {
  const categories = [
    { key: 'anklet', name: 'Anklet', image: images.accessories.Anklet },
    { key: 'bracelet', name: 'Bracelet', image: images.accessories.bracelte },
    { key: 'necklace', name: 'Necklace', image: images.accessories.neklaces },
    { key: 'watch', name: 'Watches', image: images.accessories.watches }
  ];

  return (
    <div
      className="w-full py-2 sm:py-3 md:py-4 relative z-0"
      style={{ background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)' }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md p-3 lg:p-4">
            <div className="flex justify-center gap-3">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="flex-1 max-w-xs cursor-pointer group"
                >
                  <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                    
                    <div className="flex justify-center items-center p-2 bg-gradient-to-br from-gray-50 to-white">
                      <div className="w-20 h-20 lg:w-24 lg:h-24">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="py-1.5 text-center">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="md:hidden">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-md p-2">
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => onCategoryClick(category.key)}
                  className="cursor-pointer group"
                >
                  <div className="rounded-md overflow-hidden shadow-sm bg-white">

                    <div className="flex justify-center items-center p-1.5 bg-gradient-to-br from-gray-50 to-white">
                      <div className="w-10 h-10 sm:w-14 sm:h-14">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="py-1 text-center">
                      <h3 className="text-[11px] sm:text-xs font-semibold text-gray-800 leading-tight">
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

export default CategoryRow;
