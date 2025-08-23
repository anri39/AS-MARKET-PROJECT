import { useState, useEffect } from "react";
import "./Filter.css";

type FilterProps = {
  category: string;
  dynamicBrands: string[];
  onChange: (filters: Record<string, string[] | number[]>) => void;
  preselectedFilters?: Record<string, string[] | number[]>;
  products?: any[];
  loading?: boolean;
};

function Filter({
  category,
  dynamicBrands,
  onChange,
  preselectedFilters = {},
  products = [],
  loading = false,
}: FilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, Set<string>>
  >(() => {
    const init: Record<string, Set<string>> = {};
    Object.entries(preselectedFilters).forEach(([key, values]) => {
      init[key] = new Set(values as string[]);
    });
    return init;
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);

  useEffect(() => {
    setSelectedFilters(() => {
      const init: Record<string, Set<string>> = {};
      Object.entries(preselectedFilters).forEach(([key, values]) => {
        init[key] = new Set(values as string[]);
      });
      return init;
    });
    setPriceRange([0, 25000]);
  }, [category, preselectedFilters]);

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

  const filters: { label: string; options: string[] }[] = [
    { label: "Brand", options: dynamicBrands },
    { label: "Sale", options: ["On Sale"] },
    ...(["cars", "electronics"].includes(category.toLowerCase())
      ? [
          {
            label: "Class",
            options: Array.from(
              new Set(
                products.filter((p) => p.class).map((p) => p.class.trim())
              )
            ),
          },
        ]
      : []),
    ...(category.toLowerCase() === "fruits"
      ? [
          {
            label: "Fruit Type",
            options: Array.from(
              new Set(
                products
                  .filter((p) => p.fruitType)
                  .map((p) => p.fruitType.trim())
              )
            ),
          },
        ]
      : []),
  ];

  if (loading) {
    return (
      <div className="filter-container">
        <h3 className="filter-title skeleton-text">Filters</h3>

        <div className="filter-section">
          <label className="skeleton-text">Price:</label>
          <div className="skeleton-range"></div>
          <div className="skeleton-range"></div>
        </div>

        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="filter-section">
              <label className="skeleton-text">Option {idx + 1}</label>
              {Array(3)
                .fill(null)
                .map((__, i) => (
                  <div key={i} className="filter-option">
                    <div className="skeleton-checkbox"></div>
                    <div className="skeleton-text option-text"></div>
                  </div>
                ))}
            </div>
          ))}

        <button className="apply-btn skeleton-btn" disabled>
          Apply Filters
        </button>
      </div>
    );
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

      {filters.map(({ label, options }) => (
        <div key={label} className="filter-section">
          <label>{label}</label>
          {options.length === 0 && <p>No options available</p>}
          {options.map((option) => (
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
      ))}

      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default Filter;
