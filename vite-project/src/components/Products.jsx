import { useState } from 'react';
import Hero from './Hero';
import CategoryRow from './CategoryRow';
import ProductsDisplay from './ProductsDisplay';

const Products = () => {
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
  background: 'bg-gradient-to-br from-[#EDDFE0] to-[#FFECC8]'

  }}
>

      <Hero 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
      />
      <div className="pt-20 sm:pt-18 md:pt-20 pb-4 sm:pb-6 md:pb-8">
        <CategoryRow onCategoryClick={handleCategoryClick} />
        <ProductsDisplay 
          category={selectedCategory} 
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default Products;
