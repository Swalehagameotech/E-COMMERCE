import { useState } from 'react';
import Hero from './Hero';
import FashionCategoryRow from './FashionCategoryRow';
import FashionDisplay from './FashionDisplay';

const Fashion = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null); // Clear category when searching
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
        <FashionCategoryRow onCategoryClick={handleCategoryClick} />
        <FashionDisplay 
          category={selectedCategory} 
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Fashion;
