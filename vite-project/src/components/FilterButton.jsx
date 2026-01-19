import { SlidersHorizontal, X } from 'lucide-react';

const FilterButton = ({ onClick, isActive, filterCount = 0 }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-200
        ${isActive
          ? 'bg-primary text-white shadow-md'
          : 'bg-white text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/5'
        }
      `}
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>Filters</span>
      {filterCount > 0 && (
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-bold
          ${isActive ? 'bg-white text-primary' : 'bg-primary text-white'}
        `}>
          {filterCount}
        </span>
      )}
      {isActive && (
        <X className="h-4 w-4" />
      )}
    </button>
  );
};

export default FilterButton;
