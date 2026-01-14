import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Package, Menu, X } from 'lucide-react';
import { isAuthenticated } from '../utils/auth';
import { firebaseSignOut } from '../utils/firebaseAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import titleImage from '../assets/herosection/tit copy.png';

const Hero = ({ searchQuery: externalSearchQuery, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = isAuthenticated();
  const { getCartItemCount } = useCart();
  
  const isActive = (path) => location.pathname === path;

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await firebaseSignOut();
      setMobileMenuOpen(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleOrdersClick = () => {
    navigate('/orders');
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    } else if (searchQuery.trim()) {
      // If no onSearchChange handler, navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-md">
  <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        {/* Main Header Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-2 md:gap-4 min-w-0">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={titleImage} 
              alt="Logo" 
              className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300"
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

          {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
          <nav className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <Link
              to="/home"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/home') || location.pathname === '/'
                  ? 'text-[#835151] border-b-2 border-[#835151]'
                  : 'text-[#835151] hover:text-[#835151]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/about')
                  ? 'text-[#835151] border-b-2 border-[#835151]'

                  : 'text-[#835151] hover:text-[#835151]'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive('/contact')
                  ? 'text-[#835151] border-b-2 border-[#835151]'
                  : 'text-[#835151] hover:text-[#835151]'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:flex flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-2">

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

          {/* Right Section - Cart, Orders, and Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Section - Hidden on mobile, shown on tablet+ */}
            <div
              onClick={handleCartClick}
              className="hidden sm:flex relative items-center gap-1.5 sm:gap-2 cursor-pointer group transition-all"
            >
              <div className="relative">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#835151] group-hover:text-[#B4846C] transition-colors duration-200" />

                {getCartItemCount() > 0 && (
                  <span className="
                    absolute -top-1 -right-1 sm:-top-2 sm:-right-2
                    bg-red-500 text-white text-[10px] sm:text-xs font-bold
                    rounded-full min-w-[16px] h-4 sm:min-w-[18px] sm:h-[18px]
                    flex items-center justify-center leading-none
                    shadow-md
                  ">
                    {getCartItemCount() > 9 ? '9+' : getCartItemCount()}
                  </span>
                )}
              </div>
            </div>

            {/* Orders - Desktop Only, Only when logged in */}
            {isLoggedIn && (
              <div
                onClick={handleOrdersClick}
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 cursor-pointer group transition-all"
              >
                <Package className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#835151] group-hover:text-[#B4846C] transition-colors duration-200" />
              
              </div>
            )}

            {/* Auth Button - Hidden on mobile, shown on tablet+ */}
            <button
              onClick={handleAuthAction}
              className="hidden sm:flex px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#835151] hover:bg-[#835151] text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/home"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
              <button
                onClick={handleCartClick}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart {getCartItemCount() > 0 && `(${getCartItemCount()})`}</span>
              </button>
              {isLoggedIn && (
                <>
                  <button
                    onClick={handleOrdersClick}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleAuthAction}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <button
                  onClick={handleAuthAction}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Hero;