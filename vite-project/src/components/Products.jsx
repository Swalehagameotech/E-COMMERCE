import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from './Hero';
import CategoryRow from './CategoryRow';
import ProductsDisplay from './ProductsDisplay';
import Footer from './Footer';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Read search query and subcategory from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlSubcategory = searchParams.get('subcategory');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
      setSelectedCategory(null); // Clear category when search is active
    } else {
      setSearchQuery(''); // Clear search when URL param is removed
    }
    
    if (urlSubcategory) {
      setSelectedCategory(urlSubcategory);
      setSearchQuery(''); // Clear search when subcategory is selected
    }
  }, [searchParams]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null); // Clear category when searching
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#fff9f7]">
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
        <CategoryRow onCategoryClick={handleCategoryClick} />
        <ProductsDisplay
          category={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
