import { useState } from 'react';
import Hero from './Hero';
import OthersCategoryRow from './OthersCategoryRow';
import OthersDisplay from './OthersDisplay';

const Others = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSearchQuery(''); // Clear search when subcategory is selected
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Don't clear category/subcategory when searching, just search within them
  };

  return (
   <div
  className="min-h-screen"
  style={{
  background: 'linear-gradient(to right, #FFD6BA, #E5BEB5, #FFD6BA)'

  }}
>

      <Hero 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
      />
      <div className="pt-20 sm:pt-18 md:pt-20 pb-4 sm:pb-6 md:pb-8">
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
    </div>
  );
};

export default Others;
