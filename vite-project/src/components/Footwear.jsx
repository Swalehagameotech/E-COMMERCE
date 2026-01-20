import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from './Hero';
import FootwearCategoryRow from './FootwearCategoryRow';
import FootwearDisplay from './FootwearDisplay';
import Footer from './Footer';

const Footwear = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Read search query and subcategory from URL params on mount and when URL changes
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlSubcategory = searchParams.get('subcategory');
    
    console.log('🔍 Footwear component - URL params:', { urlSearch, urlSubcategory });
    
    if (urlSearch && urlSearch.trim()) {
      setSearchQuery(urlSearch);
      setSelectedCategory(null); // Clear category when search is active
    } else {
      setSearchQuery(''); // Clear search when URL param is removed
    }
    
    if (urlSubcategory && urlSubcategory.trim()) {
      console.log('✅ Setting selectedCategory from URL:', urlSubcategory);
      setSelectedCategory(urlSubcategory);
      setSearchQuery(''); // Clear search when subcategory is selected
    } else if (!urlSubcategory && !urlSearch) {
      // Only clear category if there's no URL param (don't clear if just no subcategory param)
      // setSelectedCategory(null);
    }
  }, [searchParams]);

  const handleCategoryClick = (category) => {
    console.log('🔍 FootwearCategoryRow clicked:', category);
    // Update URL to maintain consistency
    navigate(`/footwear?subcategory=${category}`, { replace: true });
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null); // Clear category when searching
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  return (
   <div
  className="min-h-screen"
  style={{
  background: 'bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8]'

  }}
>
      {/* Back Arrow */}
     <button
  onClick={handleBackClick}
  className="fixed top-28 sm:top-20 left-4 z-[110]
             bg-white/80 hover:bg-white text-gray-700
             p-2 rounded-full shadow-lg
             transition-all duration-200"
>

        <ArrowLeft className="h-5 w-5" />
      </button>

      <Hero 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
      />
      <div className="pt-32 sm:pt-32 md:pt-36 pb-4 sm:pb-6 md:pb-8">
        <FootwearCategoryRow onCategoryClick={handleCategoryClick} />
        <FootwearDisplay 
          category={selectedCategory} 
          searchQuery={searchQuery}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Footwear;
