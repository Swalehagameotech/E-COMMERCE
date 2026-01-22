import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import featuredProductAPI from '../utils/featuredProductApi';

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await featuredProductAPI.getFeaturedProducts();
        if (response.success) {
          setProducts((response.data || []).slice(0, 16));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}?collection=featuredproducts`);
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

  if (loading || !products.length) return null;

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B4A6B] mb-2 tracking-tight">
                Featured Products
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FFB6C1] to-transparent mx-auto"></div>
            </div>
          </div>

          <div className="flex justify-end">
            <p
              onClick={() => navigate('/featuredproducts')}
              className="text-[#8B4A6B] hover:text-[#FF69B4] font-semibold text-sm sm:text-base uppercase tracking-wider transition-colors duration-200 border-b-2 border-transparent hover:border-[#FF69B4] cursor-pointer"
            >
              View All
            </p>
          </div>
        </div>

        {/* ✅ GRID (NO SCROLL) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="cursor-pointer group"
            >
              <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ">

                {/* Image */}
                <div className="w-full aspect-[4/5] bg-white overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
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
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    {renderStars(product.stars || 0)}
                    <span className="text-[10px] sm:text-xs text-[#8B4A6B]/70 ml-1">
                      ({product.stars || 0})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.discounted_price ? (
                      <>
                        <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                          ₹{product.discounted_price}
                        </span>
                        <span className="text-[10px] sm:text-sm text-[#8B4A6B]/50 line-through">
                          ₹{product.original_price || product.price || 0}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-lg font-bold text-[#8B4A6B]">
                        ₹{product.original_price || product.price || 0}
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

export default FeaturedSection;
