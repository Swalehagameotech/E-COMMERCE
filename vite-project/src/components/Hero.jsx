import { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { isAuthenticated, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import titleImage from '../assets/herosection/tit.png';

const Hero = ({ searchQuery: externalSearchQuery, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || '');
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const { getCartItemCount } = useCart();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Update local state when external prop changes
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-2 md:gap-4 min-w-0">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={titleImage} 
              alt="Logo" 
              className="h-10 w-20 sm:h-8 sm:w-8 md:h-10 md:w-10 object-cover max-w-full"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="h-7 w-20 sm:h-8 sm:w-24 md:h-10 md:w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-lg hidden"
            >
              LOGO
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:flex flex-1 min-w-0 max-w-md md:max-w-lg lg:max-w-xl mx-2 md:mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative w-full">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-7 sm:pl-9 md:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </form>
          </div>

          {/* Right Section - Cart and Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-shrink-0">
            {/* Cart Section */}
            <div 
              onClick={handleCartClick}
              className="flex items-center gap-0.5 sm:gap-1 md:gap-2 cursor-pointer hover:text-purple-600 transition-colors duration-200 relative"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount() > 9 ? '9+' : getCartItemCount()}
                </span>
              )}
              <span className="text-xs sm:text-sm font-medium hidden md:block whitespace-nowrap">cart</span>
            </div>

            {/* Auth Button */}
            <button
              onClick={handleAuthAction}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden sm:inline">{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
              <span className="sm:hidden">{isLoggedIn ? 'Out' : 'In'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Only visible on mobile */}
        <div className="sm:hidden px-2 pb-2 pt-1">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Hero;