import "./StorePage.css";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Card from "../components/Card.tsx";

type Product = {
  imageUrl: string;
  name: string;
  price: number;
  discount?: string;
};

function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDocs(collection(db, "products")).then((res) => {
      setProducts(res.docs.map((doc) => doc.data() as Product));
    });
  }, []);

  return (
    <div className="storepage-wrapper">
      <div className="storepage-header">
        <h1 className="storepage-title">Products ({products.length})</h1>
        <div className="storepage-filters">
          <p>Filter by:</p>
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
        {products.map((item, i) => (
          <Card
            key={i}
            image={item.imageUrl}
            title={item.name}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div>
    </div>
  );
}

export default StorePage;
