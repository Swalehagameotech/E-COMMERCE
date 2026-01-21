import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuggestionsSection = ({ products, collectionType }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}?collection=${collectionType}`);
    window.scrollTo(0, 0);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#FFB6C1] text-[#FFB6C1]"
        />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFE4E1]"
        />
      );
    }

    return stars;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B4A6B] mb-2 tracking-tight">
              You May Also Like
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent"></div>
          </div>
        </div>

        {/* ✅ GRID (NO SCROLL, SAME AS FEATURED) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => handleProductClick(item._id)}
              className="cursor-pointer group"
            >
              <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">

                {/* Image */}
                <div className="w-full aspect-[4/5] bg-gradient-to-br from-[#FFF0F5] to-[#FFE4E1] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="p-3 sm:p-5 bg-white">
                  <h3 className="text-xs sm:text-base font-bold text-[#8B4A6B] mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-[#FF69B4] transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    {renderStars(item.stars || 0)}
                    <span className="text-[10px] sm:text-xs text-[#8B4A6B]/70 ml-1">
                      ({item.stars || 0})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.discounted_price ? (
                      <>
                        <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                          ₹{item.discounted_price}
                        </span>
                        <span className="text-[10px] sm:text-sm text-[#8B4A6B]/50 line-through">
                          ₹{item.original_price || item.price || 0}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                        ₹{item.original_price || item.price || 0}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuggestionsSection;
