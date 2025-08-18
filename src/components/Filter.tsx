import { useState, useEffect } from "react";
import "./Filter.css";

type FilterProps = {
  category: string;
  dynamicBrands: string[];
  onChange: (filters: Record<string, string[] | number[]>) => void;
};

const categoryFilters: Record<string, { label: string; options: string[] }[]> =
  {
    Groceries: [
      { label: "Brand", options: [] },
      { label: "Organic", options: ["Yes", "No"] },
      { label: "Weight", options: ["250g", "500g", "1kg", "2kg+"] },
    ],
    "Premium Fruits": [
      { label: "Origin", options: ["Local", "Imported"] },
      { label: "Organic", options: ["Yes", "No"] },
      { label: "Brand", options: [] },
    ],
    "Home & Kitchen": [
      { label: "Brand", options: [] },
      { label: "Material", options: ["Plastic", "Metal", "Wood", "Glass"] },
      { label: "Color", options: ["Black", "White", "Silver", "Red", "Blue"] },
    ],
    Fashion: [
      { label: "Brand", options: [] },
      { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { label: "Color", options: ["Black", "White", "Blue", "Red", "Green"] },
    ],
    Electronics: [
      { label: "Brand", options: [] },
      { label: "Storage", options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
      { label: "Cooler", options: ["Air", "Liquid", "None"] },
    ],
    Beauty: [
      { label: "Brand", options: [] },
      { label: "Type", options: ["Cream", "Serum", "Lotion", "Makeup"] },
      { label: "Skin Type", options: ["Oily", "Dry", "Normal", "Combination"] },
    ],
    "Home Improvement": [
      { label: "Brand", options: [] },
      { label: "Power Source", options: ["Electric", "Battery", "Manual"] },
      { label: "Material", options: ["Metal", "Plastic", "Wood"] },
    ],
    "Sports, Toys & Luggage": [
      { label: "Brand", options: [] },
      { label: "Age Group", options: ["Kids", "Teens", "Adults"] },
      { label: "Color", options: ["Black", "Blue", "Red", "Green"] },
    ],
  };

function Filter({ category, dynamicBrands, onChange }: FilterProps) {
  // If category is "all", only show Brand filter
  const filters =
    category === "all"
      ? [{ label: "Brand", options: [] }]
      : categoryFilters[category] || [];

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<string>>
  >({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);

  // Reset filters on category change
  useEffect(() => {
    setSelectedFilters({});
    setPriceRange([0, 25000]);
  }, [category]);

  function toggleOption(label: string, option: string) {
    setSelectedFilters((prev) => {
      const prevSet = prev[label] || new Set();
      const newSet = new Set(prevSet);
      newSet.has(option) ? newSet.delete(option) : newSet.add(option);
      return { ...prev, [label]: newSet };
    });
  }

  function applyFilters() {
    const filtersToSend: Record<string, string[] | number[]> = {};
    Object.entries(selectedFilters).forEach(([key, val]) => {
      filtersToSend[key] = Array.from(val);
    });
    filtersToSend["Price"] = priceRange;
    onChange(filtersToSend);
  }

  return (
    <div className="filter-container">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-section">
        <label>Price:</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <input
            type="number"
            min={priceRange[0]}
            max={25000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
        </div>
        <input
          type="range"
          min={0}
          max={25000}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
        />
        <input
          type="range"
          min={0}
          max={25000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
        />
      </div>

      {filters.map(({ label, options }) => {
        const opts = label === "Brand" ? dynamicBrands : options;
        return (
          <div key={label} className="filter-section">
            <label>{label}</label>
            {opts.length === 0 && <p>No options available</p>}
            {opts.map((option) => (
              <div key={option} className="filter-option">
                <input
                  type="checkbox"
                  id={`${label}-${option}`}
                  checked={selectedFilters[label]?.has(option) || false}
                  onChange={() => toggleOption(label, option)}
                />
                <label htmlFor={`${label}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      })}

      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default Filter;
