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
    <div className="w-full bg-secondary px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Shop by Category</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(images).map(([categoryKey, items]) => (
            <div
              key={categoryKey}
              onClick={() => handleCategoryClick(categoryKey)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-accent/30 hover:border-accent p-6 hover:scale-105 transform"
            >
              {/* Category Title */}
              <h3
                className="text-xl font-serif font-bold text-center mb-6 text-primary group-hover:text-accent transition-colors duration-300"
              >
                {categoryLabels[categoryKey] || formatTitle(categoryKey)}
              </h3>

              {/* Sub-boxes */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(items).map(([itemKey, imageUrl]) => (
                  <div
                    key={itemKey}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full h-24 mb-3 overflow-hidden bg-secondary rounded-lg flex items-center justify-center p-2">
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
                    <span className="text-xs uppercase tracking-wider font-bold text-primary/60">
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