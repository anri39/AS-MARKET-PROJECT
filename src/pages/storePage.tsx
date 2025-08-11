import "./StorePage.css";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "../components/Card.tsx";
import Filter from "../components/Filter.tsx";
import Navbar from "../components/Navbar.tsx";
import { useParams } from "react-router-dom";

type Product = {
  id?: string;
  imageUrl: string;
  name: string;
  price: number;
  discount?: string;
  category: string;
  brand?: string;
  storage?: string;
  cooler?: string;
  [key: string]: any;
};

function StorePage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, string[] | number[]>>(
    {}
  );
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (!category) return;

    async function fetchProducts() {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(data);
      setFilteredProducts(data);
      setFilters({});

      const uniqueBrands = Array.from(
        new Set(
          data
            .map((p) => p.brand)
            .filter(
              (b): b is string => typeof b === "string" && b.trim() !== ""
            )
            .map((b) => b.trim())
        )
      ).sort((a, b) => a.localeCompare(b));

      setBrands(uniqueBrands);
    }

    fetchProducts();
  }, [category]);

  const filterLabelToFieldKey: Record<string, string> = {
    Brand: "brand",
    Storage: "storage",
    Cooler: "cooler",
  };

  useEffect(() => {
    let filtered = [...products];

    if (filters.Price && Array.isArray(filters.Price)) {
      const [min, max] = filters.Price as number[];
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    Object.entries(filters).forEach(([filterLabel, filterValues]) => {
      if (filterLabel === "Price") return;

      if (filterValues.length === 0) return;

      const fieldKey =
        filterLabelToFieldKey[filterLabel] || filterLabel.toLowerCase();

      const normalizedFilterValues = (filterValues as string[]).map((v) =>
        v.trim().toLowerCase()
      );

      filtered = filtered.filter((product) => {
        const val = product[fieldKey];
        if (!val) return false;
        const valNormalized = String(val).trim().toLowerCase();
        return normalizedFilterValues.includes(valNormalized);
      });
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <>
      <div className="storepage-container">
        <Navbar />
      </div>

      <div className="storepage-content">
        <aside className="storepage-filter">
          <Filter
            category={category || ""}
            dynamicBrands={brands}
            onChange={setFilters}
          />
        </aside>

        <main className="storepage-main">
          <div className="storepage-header">
            <h1 className="storepage-title">
              Products ({filteredProducts.length})
            </h1>
            <div className="storepage-filters">
              <p>Sort by:</p>
              <select>
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <select>
                <option value="10">Show 10</option>
                <option value="20">Show 20</option>
                <option value="50">Show 50</option>
              </select>
            </div>
          </div>

          <div className="storepage-cards">
            {filteredProducts.map((item, i) => (
              <Card
                key={item.id || i}
                image={item.imageUrl}
                title={item.name}
                price={item.price}
                discount={item.discount}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default StorePage;
