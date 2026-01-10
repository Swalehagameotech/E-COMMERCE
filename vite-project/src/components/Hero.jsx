import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { isAuthenticated, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import titleImage from '../assets/herosection/title2.png';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

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
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
              src={titleImage} 
              alt="Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              onError={(e) => {
                // Fallback if image doesn't load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="h-8 w-24 sm:h-10 sm:w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-lg hidden"
            >
              LOGO
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
            </form>
          </div>

          {/* Right Section - Cart and Auth */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Cart Section */}
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-purple-600 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">cart</span>
            </div>

            {/* Auth Button */}
            <button
              onClick={handleAuthAction}
              className="px-3 py-2 sm:px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              {isLoggedIn ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (hidden on desktop) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Hero;