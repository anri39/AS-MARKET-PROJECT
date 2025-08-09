import "./Filter.css";

function Filter() {
  return (
    <>
      <div className="filter-container">
        <h3 className="filter-title">Filters</h3>

        {/* Price Filter */}
        <div className="filter-section">
          <label>Price:</label>
          <div className="price-inputs">
            <input type="number" value={0} />
            <input type="number" value={25000} />
          </div>
          <input type="range" min={0} max={25000} value={0} />
        </div>

        {/* Brand */}
        <div className="filter-section">
          <label>Brand</label>
          <div>
            <input type="checkbox" /> Brand A
          </div>
          <div>
            <input type="checkbox" /> Brand B
          </div>
          <div>
            <input type="checkbox" /> Brand C
          </div>
        </div>

        {/* Type */}
        <div className="filter-section">
          <label>Type</label>
          <div>
            <input type="checkbox" /> Type A
          </div>
          <div>
            <input type="checkbox" /> Type B
          </div>
          <div>
            <input type="checkbox" /> Type C
          </div>
        </div>

        {/* Capacity */}
        <div className="filter-section">
          <label>Capacity</label>
          <div>
            <input type="checkbox" /> 128GB
          </div>
          <div>
            <input type="checkbox" /> 256GB
          </div>
          <div>
            <input type="checkbox" /> 512GB
          </div>
        </div>

        {/* Color */}
        <div className="filter-section color">
          <label>Color</label>
          <div>
            <input type="checkbox" /> Black
          </div>
          <div>
            <input type="checkbox" /> Blue
          </div>
          <div>
            <input type="checkbox" /> White
          </div>
        </div>

        <button className="apply-btn">Apply Filters</button>
      </div>
    </>
  );
}

export default Filter;
