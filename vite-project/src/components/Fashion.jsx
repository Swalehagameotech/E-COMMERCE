import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import FashionCategoryRow from './FashionCategoryRow';
import FashionDisplay from './FashionDisplay';
import Footer from './Footer';

const Fashion = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
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
        className="fixed top-20 left-4 z-[110] bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <Hero 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
      />
      <div className="pt-20 sm:pt-18 md:pt-20 pb-4 sm:pb-6 md:pb-8">
        <FashionCategoryRow onCategoryClick={handleCategoryClick} />
        <FashionDisplay 
          category={selectedCategory} 
          searchQuery={searchQuery}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Fashion;
