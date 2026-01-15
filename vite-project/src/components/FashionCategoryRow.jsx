import { images } from '../utils/CardsImage';

const FashionCategoryRow = ({ onCategoryClick }) => {
  const categories = [
    { key: 'comfy', name: 'Comfy', image: images.fashion.comfy },
    { key: 'kurta', name: 'Kurta', image: images.fashion.kurta },
    { key: 'belts', name: 'Belts', image: images.fashion.Belts },
    { key: 'scarf', name: 'Scarf', image: images.fashion.scarf }
  ];

  return (
     <div
      className="w-full py-2 sm:py-3 md:py-4 relative z-0 bg-secondary"
    >
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
                  <div className="w-26 h-26 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-secondary hover:bg-white border-2 border-accent/30 hover:border-accent hover:scale-110 transform flex items-center justify-center p-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply"
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
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md bg-secondary hover:bg-white transition-all duration-300 border-2 border-accent/30 hover:border-accent flex items-center justify-center p-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-contain mix-blend-multiply"
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

export default FashionCategoryRow;
