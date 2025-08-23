import "./storePage.css";
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "../components/Card.tsx";
import Filter from "../components/Filter.tsx";
import Navbar from "../components/Navbar.tsx";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import SearchNotFound from "../components/SearchNotFound.tsx";

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
  class?: string;
  fruitType?: string;
  [key: string]: any;
};

function StorePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [sortOption, setSortOption] = useState("");
  const [cardToShow, setCardsToShow] = useState("12");
  const parsedCards = parseInt(cardToShow, 10);
  const [currentPage, setCurrentPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const preselectedFilters = (location.state as any)?.preselectedFilters || {};

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] =
    useState<Record<string, string[] | number[]>>(preselectedFilters);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getDiscountedPrice = (product: Product): number => {
    if (!product.discount) return product.price;
    const discountNumber = parseFloat(product.discount.replace("%", ""));
    if (isNaN(discountNumber)) return product.price;
    return product.price * (1 - discountNumber / 100);
  };

  const sortedItems = useMemo(() => {
    if (sortOption === "high") {
      return [...filteredProducts].sort(
        (a, b) => getDiscountedPrice(b) - getDiscountedPrice(a)
      );
    } else if (sortOption === "low") {
      return [...filteredProducts].sort(
        (a, b) => getDiscountedPrice(a) - getDiscountedPrice(b)
      );
    }
    return filteredProducts;
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let q;
      if (category && category !== "all") {
        q = query(
          collection(db, "products"),
          where("category", "==", category)
        );
      } else {
        q = query(collection(db, "products"));
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(data);
      setFilteredProducts(data);

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
      setLoading(false);
    }

    fetchProducts();
  }, [category]);

  const filterLabelToFieldKey: Record<string, string> = {
    Brand: "brand",
    Storage: "storage",
    Cooler: "cooler",
    Class: "class",
    "Fruit Type": "fruitType",
  };

  useEffect(() => {
    if (loading) return;
    let filtered = [...products];

    if (filters.Price && Array.isArray(filters.Price)) {
      const [min, max] = filters.Price as number[];
      filtered = filtered.filter((p) => {
        const discounted = getDiscountedPrice(p);
        return discounted >= min && discounted <= max;
      });
    }

    Object.entries(filters).forEach(([filterLabel, filterValues]) => {
      if (filterLabel === "Price") return;
      if (filterValues.length === 0) return;

      if (
        filterLabel === "Sale" &&
        (filterValues as string[]).includes("On Sale")
      ) {
        filtered = filtered.filter(
          (p) => p.discount && parseFloat(p.discount) > 0
        );
        return;
      }

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

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [filters, products, searchParams.toString(), loading]);

  const startIndex = (currentPage - 1) * parsedCards;
  const endIndex = startIndex + parsedCards;
  const totalPages = Math.ceil(sortedItems.length / parsedCards);
  const pagedItems = sortedItems.slice(startIndex, endIndex);

  return (
    <>
      <div className="storepage-container">
        <Navbar />
      </div>

      <div
        className={`storepage-content ${
          pagedItems.length === 0 && !loading ? "notfound-active" : ""
        }`}
      >
        <aside className="storepage-filter">
          <Filter
            category={category || "all"}
            dynamicBrands={brands}
            onChange={setFilters}
            preselectedFilters={preselectedFilters}
            products={products}
            loading={loading}
          />
        </aside>

        <main className={`storepage-main`}>
          {pagedItems.length > 0 || loading ? (
            <>
              <div className="storepage-header">
                <h1 className="storepage-title">
                  Products ({filteredProducts.length})
                </h1>
                <div className="storepage-filters">
                  <p>Sort by:</p>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                  <select
                    value={cardToShow}
                    onChange={(e) => {
                      setCardsToShow(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="12">Show 12</option>
                    <option value="24">Show 24</option>
                    <option value="48">Show 48</option>
                  </select>
                </div>
              </div>

              <div className="storepage-cards">
                {(loading ? Array(parsedCards).fill({}) : pagedItems).map(
                  (item, i) => (
                    <Card
                      key={item.id || i}
                      id={item.id || ""}
                      category={item.category || ""}
                      image={item.imageUrl || ""}
                      title={item.name || ""}
                      price={item.price || 0}
                      discount={item.discount || ""}
                      loading={loading}
                    />
                  )
                )}
              </div>

              <div className="pagination-buttons">
                {currentPage > 1 && (
                  <button
                    className="prevbut"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                {currentPage < totalPages && (
                  <button
                    className="nextbut"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          ) : (
            <SearchNotFound />
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default StorePage;
