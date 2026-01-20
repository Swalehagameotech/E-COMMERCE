import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from './Hero';
import OthersCategoryRow from './OthersCategoryRow';
import OthersDisplay from './OthersDisplay';
import Footer from './Footer';

const Others = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Read search query and subcategory from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlSubcategory = searchParams.get('subcategory');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
      // Don't clear category/subcategory when searching
    } else {
      setSearchQuery(''); // Clear search when URL param is removed
    }
    
    if (urlSubcategory) {
      setSelectedSubcategory(urlSubcategory);
      setSearchQuery(''); // Clear search when subcategory is selected
    }
  }, [searchParams]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSubcategoryClick = (subcategory) => {
    console.log('🔍 OthersCategoryRow subcategory clicked:', subcategory);
    // Update URL to maintain consistency
    navigate(`/others?subcategory=${subcategory}`, { replace: true });
    setSelectedSubcategory(subcategory);
    setSearchQuery(''); // Clear search when subcategory is selected
    // Keep the category set when subcategory is selected
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Don't clear category/subcategory when searching, just search within them
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
        className="fixed top-20 left-4 z-[110] bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <Hero 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
      />
      <div className="pt-32 sm:pt-32 md:pt-36 pb-4 sm:pb-6 md:pb-8">
        <OthersCategoryRow 
          onCategoryClick={handleCategoryClick}
          onSubcategoryClick={handleSubcategoryClick}
        />
        <OthersDisplay 
          category={selectedCategory} 
          subcategory={selectedSubcategory}
          searchQuery={searchQuery}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Others;
