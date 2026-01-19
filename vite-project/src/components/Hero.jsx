import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './AuthModal';
import { API_ENDPOINTS } from '../config/apiConfig';
// Logo URL updated to use Cloudinary image
const logo = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1768745498/bloom-removebg-preview_s6namb.png';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null); // 'accessories' | 'footwear' | 'fashion' | 'others' | null // false = closed, true = main grid, 'accessories'|'footwear'|'fashion'|'others' = submenu

  const navigate = useNavigate();
  const { cart, clearLocalCart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user details to check isAdmin
        // This assumes you have an API or some way to check admin role.
        // For now, since user says "when admin is true", we need a way to know.
        // Usually we fetch user profile from DB.

        // NOTE: Since we are in frontend, we might not have isAdmin in firebase payload unless custom claims.
        // I will assume we fetch user data from our backend.
      }
    });
    return () => unsubscribe();
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin status
  useEffect(() => {
    const checkAdmin = async () => {
      if (user && user.uid) {
        try {
          const token = await user.getIdToken();
          const res = await fetch(`${API_ENDPOINTS.AUTH}/profile`, {
            headers: {
              'x-firebase-uid': user.uid
            }
          });
          const data = await res.json();
          if (data.success && data.data.user.isAdmin) {
            setIsAdmin(true);
            // If on home page or login, redirect to admin
            if (!window.location.pathname.startsWith('/admin')) {
              navigate('/admin');
            }
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking admin:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
    if (user) {
      checkAdmin();
    }
  }, [user, navigate]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearLocalCart();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAdmin) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm shadow-sm transition-all duration-300 border-b border-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img src={logo} alt="LUXE Logo" className="h-12 w-auto object-contain" />
              </div>

              {/* Admin Only Menu */}
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold mr-4">Admin Panel</span>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 rounded-full border border-primary/10 hover:border-accent transition-colors bg-white/50 !shadow-none !px-3 !py-1"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as Admin</p>
                        <p className="text-sm font-medium truncate">{user?.email}</p>
                      </div>
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-secondary flex items-center gap-2 !rounded-none !border-none !bg-transparent !shadow-none"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Animated Sale Banner */}
        <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-[#FFB6C1] via-[#FFC0CB] to-[#FFB6C1] overflow-hidden shadow-lg">
          <div className="relative flex items-center h-10 sm:h-12">
            <div className="flex animate-scroll-left whitespace-nowrap">
              <div className="flex items-center gap-12 px-8">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-[#8B4A6B] font-bold text-sm sm:text-base uppercase tracking-wider flex items-center gap-3">
                    <span className="inline-block w-2 h-2 bg-[#8B4A6B] rounded-full animate-pulse"></span>
                     Republic Day Sale is Live 
                    <span className="inline-block w-2 h-2 bg-[#8B4A6B] rounded-full animate-pulse"></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm shadow-sm transition-all duration-300 border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary hover:text-accent p-2 !bg-transparent !border-none !shadow-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link to="/home" className="flex items-center">
                <img src={logo} alt="LUXE Logo" className="h-6 md:h-8 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden  md:flex items-center justify-center flex-1 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold uppercase tracking-widest text-primary/80 hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
                <p className="text-sm font-bold uppercase tracking-widest text-primary/80 hover:text-accent transition-colors duration-200 cursor-pointer">
                  Products
                </p>
                {showProductsMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-[#FFE4E1] p-6 z-50">
                    <div className="grid grid-cols-4 gap-6">
                      {/* Accessories */}
                      <div>
                        <h3 className="text-lg font-bold text-[#8B4A6B] mb-4 pb-2 border-b border-[#FFE4E1]">Accessories</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link 
                              to="/products?subcategory=anklet" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Anklet
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/products?subcategory=bracelet" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Bracelet
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/products?subcategory=necklace" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Necklace
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/products?subcategory=watch" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Watches
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Footwear */}
                      <div>
                        <h3 className="text-lg font-bold text-[#8B4A6B] mb-4 pb-2 border-b border-[#FFE4E1]">Footwear</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link 
                              to="/footwear?subcategory=sandals" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Sandals
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/footwear?subcategory=boots" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Boots
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/footwear?subcategory=flats" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Flats
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/footwear?subcategory=sneakers" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Sneakers
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Fashion */}
                      <div>
                        <h3 className="text-lg font-bold text-[#8B4A6B] mb-4 pb-2 border-b border-[#FFE4E1]">Fashion</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link 
                              to="/fashion?subcategory=comfy" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Comfy
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/fashion?subcategory=kurta" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Kurta
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/fashion?subcategory=belt" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Belts
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/fashion?subcategory=scarf" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Scarf
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Others */}
                      <div>
                        <h3 className="text-lg font-bold text-[#8B4A6B] mb-4 pb-2 border-b border-[#FFE4E1]">Others</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link 
                              to="/others?subcategory=skincare" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Skincare
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/others?subcategory=bags" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Bags
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/others?subcategory=perfume" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Perfumes
                            </Link>
                          </li>
                          <li>
                            <Link 
                              to="/others?subcategory=glasses" 
                              className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors block py-1"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              Glasses
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* Explore More Section */}
                    <div className="mt-6 pt-6 border-t border-[#FFE4E1]">
                      <h3 className="text-lg font-bold text-[#8B4A6B] mb-4">Explore More</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <Link 
                          to="/home#trending" 
                          className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors text-center py-2 px-4 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1]"
                          onClick={() => setShowProductsMenu(false)}
                        >
                          Trending
                        </Link>
                        <Link 
                          to="/home#sale" 
                          className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors text-center py-2 px-4 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1]"
                          onClick={() => setShowProductsMenu(false)}
                        >
                          Sale
                        </Link>
                        <Link 
                          to="/home#newarrival" 
                          className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors text-center py-2 px-4 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1]"
                          onClick={() => setShowProductsMenu(false)}
                        >
                          New Arrival
                        </Link>
                        <Link 
                          to="/home#featured" 
                          className="text-sm text-gray-700 hover:text-[#FF69B4] transition-colors text-center py-2 px-4 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1]"
                          onClick={() => setShowProductsMenu(false)}
                        >
                          Featured Product
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Icons & Actions */}
            <div className="flex items-center justify-end gap-2 md:gap-4 flex-1 md:flex-none">

              {/* Search Bar - Desktop */}
              <div className="hidden md:block relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-full border border-primary/10 bg-white/50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 w-48 focus:w-64 text-sm`}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary/50" />
                </form>
              </div>

              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2 text-primary hover:text-accent !bg-transparent !border-none !shadow-none"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-primary hover:text-accent transition-colors">
                <ShoppingCart className="h-5 w-5 stroke-[2.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-1 rounded-full border border-primary/10 hover:border-accent transition-colors bg-white/50 !shadow-none !px-3 !py-1"
                    >
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="h-6 w-6 rounded-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-primary stroke-[2.5]" />
                      )}
                    </button>

                    {/* Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium truncate">{user.email}</p>
                        </div>
                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary">
                          My Orders
                        </Link>
                        {/* Admin Panel Link Removed for non-admins */}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-secondary flex items-center gap-2 !rounded-none !border-none !bg-transparent !shadow-none"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="p-2 text-primary hover:text-accent !bg-transparent !border-none !shadow-none"
                  >
                    <User className="h-5 w-5 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-3 bg-white border-t border-gray-100 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-transparent focus:bg-white focus:ring-2 focus:ring-accent outline-none text-sm"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
       {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
          <div className={`fixed inset-y-0 left-0 w-72 bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <img src={logo} alt="LUXE" className="h-8 w-auto" />
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-primary !bg-transparent !border-none !shadow-none !p-1">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white border-b border-pink-100 last:border-b-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Products Menu - Mobile */}
                <div>
                  <button
                    onClick={() => {
                      setShowProductsMenu(!showProductsMenu);
                      setExpandedCategory(null); // Reset expanded category when toggling Products
                    }}
                    className="w-full text-left text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white flex items-center justify-between"
                  >
                    Products
                    <span className="text-sm">{showProductsMenu ? '−' : '+'}</span>
                  </button>
                  {showProductsMenu && (
                    <div className="bg-pink-50/50">
                      {/* Accessories - Accordion */}
                      <div>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === 'accessories' ? null : 'accessories')}
                          className="w-full text-left text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white flex items-center justify-between"
                        >
                          Accessories
                          <span className="text-sm">{expandedCategory === 'accessories' ? '−' : '+'}</span>
                        </button>
                        {expandedCategory === 'accessories' && (
                          <div className="bg-white px-6 py-2 space-y-1">
                            <Link to="/products?subcategory=anklet" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Anklet</Link>
                            <Link to="/products?subcategory=bracelet" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Bracelet</Link>
                            <Link to="/products?subcategory=necklace" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Necklace</Link>
                            <Link to="/products?subcategory=watch" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Watches</Link>
                          </div>
                        )}
                      </div>

                      {/* Footwear - Accordion */}
                      <div>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === 'footwear' ? null : 'footwear')}
                          className="w-full text-left text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white flex items-center justify-between"
                        >
                          Footwear
                          <span className="text-sm">{expandedCategory === 'footwear' ? '−' : '+'}</span>
                        </button>
                        {expandedCategory === 'footwear' && (
                          <div className="bg-white px-6 py-2 space-y-1">
                            <Link to="/footwear?subcategory=sandals" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Sandals</Link>
                            <Link to="/footwear?subcategory=boots" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Boots</Link>
                            <Link to="/footwear?subcategory=flats" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Flats</Link>
                            <Link to="/footwear?subcategory=sneakers" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Sneakers</Link>
                          </div>
                        )}
                      </div>

                      {/* Fashion - Accordion */}
                      <div>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === 'fashion' ? null : 'fashion')}
                          className="w-full text-left text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white flex items-center justify-between"
                        >
                          Fashion
                          <span className="text-sm">{expandedCategory === 'fashion' ? '−' : '+'}</span>
                        </button>
                        {expandedCategory === 'fashion' && (
                          <div className="bg-white px-6 py-2 space-y-1">
                            <Link to="/fashion?subcategory=comfy" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Comfy</Link>
                            <Link to="/fashion?subcategory=kurta" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Kurta</Link>
                            <Link to="/fashion?subcategory=belt" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Belts</Link>
                            <Link to="/fashion?subcategory=scarf" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Scarf</Link>
                          </div>
                        )}
                      </div>

                      {/* Others - Accordion */}
                      <div>
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === 'others' ? null : 'others')}
                          className="w-full text-left text-base font-semibold text-primary hover:text-accent hover:bg-pink-50 transition-all px-6 py-4 bg-white flex items-center justify-between"
                        >
                          Others
                          <span className="text-sm">{expandedCategory === 'others' ? '−' : '+'}</span>
                        </button>
                        {expandedCategory === 'others' && (
                          <div className="bg-white px-6 py-2 space-y-1">
                            <Link to="/others?subcategory=skincare" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Skincare</Link>
                            <Link to="/others?subcategory=bags" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Bags</Link>
                            <Link to="/others?subcategory=perfume" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Perfumes</Link>
                            <Link to="/others?subcategory=glasses" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="block text-sm text-gray-700 hover:text-[#FF69B4] py-2">Glasses</Link>
                          </div>
                        )}
                      </div>

                      {/* Explore More */}
                      <div className="px-6 py-3 bg-white">
                        <h3 className="text-sm font-bold text-[#8B4A6B] mb-2">Explore More</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/home#trending" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="text-xs text-center py-2 px-3 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1] text-gray-700">Trending</Link>
                          <Link to="/home#sale" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="text-xs text-center py-2 px-3 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1] text-gray-700">Sale</Link>
                          <Link to="/home#newarrival" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="text-xs text-center py-2 px-3 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1] text-gray-700">New Arrival</Link>
                          <Link to="/home#featured" onClick={() => {setIsMenuOpen(false); setShowProductsMenu(false); setExpandedCategory(null);}} className="text-xs text-center py-2 px-3 bg-[#FFF0F5] rounded-lg hover:bg-[#FFE4E1] text-gray-700">Featured</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      
      {/* Animated Sale Banner */}
      {/* Premium Animated Sale Banner */}
<div className="fixed top-20 left-0 right-0 z-40 
  bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 
  backdrop-blur-md border-y border-pink-200/50 shadow-sm overflow-hidden">

  <div className="relative flex items-center h-10 sm:h-12 md:h-14">
    
    <div className="flex animate-smooth-scroll whitespace-nowrap">
      
      {[...Array(2)].map((_, index) => (
        <div key={index} className="flex items-center gap-10 sm:gap-16 px-6 sm:px-10">
          
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="
                flex items-center gap-3
                text-[#7A3B5F]
                font-extrabold
                text-xs sm:text-sm md:text-base
                tracking-wide sm:tracking-widest
                uppercase
                drop-shadow-sm
              "
            >
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 
                bg-pink-500 rounded-full animate-pulse">
              </span>

              Republic Day Sale is Live

              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 
                bg-pink-500 rounded-full animate-pulse">
              </span>
            </span>
          ))}

        </div>
      ))}

    </div>

  </div>
</div>

    </>
  );
};

export default Hero;