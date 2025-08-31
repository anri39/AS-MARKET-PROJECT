import "./productPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Product as SimilarProduct } from "../components/SimiliarProducts";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import SimilarProducts from "../components/SimiliarProducts";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  type Product = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    image2?: string;
    image3?: string;
    image4?: string;
    discount?: string;
    category: string;
    brand?: string;
    storage?: string;
    cooler?: string;
    description?: string;
    stock?: boolean;
    warranty?: string;
    [key: string]: any;
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState(1);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    getDoc(doc(db, "products", id)).then((docSnap) => {
      const data = docSnap.data() as Product;
      setProduct(data);
      setMainImage(data.imageUrl);

      if (data.category) {
        const q = query(
          collection(db, "products"),
          where("category", "==", data.category)
        );

        getDocs(q).then((snap) => {
          const filtered = snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as SimilarProduct))
            .filter((p) => p.id !== id);
          setSimilarProducts(filtered);
        });
      }
    });
  }, [id]);

  if (!product) return null;

  const discountPct = parseFloat(String(product.discount ?? "0")) || 0;
  const hasDiscount = discountPct > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - discountPct / 100)
    : product.price;

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="product-container">
          <div
            className="product-image-section"
            style={{ position: "relative" }}
          >
            <div className="breadcrumbs">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <a href={`/store/${product.category}`}>{product.category}</a>
              <span className="separator">/</span>
              <span>{product.name}</span>
            </div>

            <div className="product-image-placeholder">
              <img src={mainImage} alt={product.name} />
            </div>

            <div className="thumbnail-row">
              {[product.image2, product.image3, product.image4].map(
                (thumb, index) =>
                  thumb && (
                    <div
                      key={index}
                      className="thumbnail"
                      onClick={() => setMainImage(thumb)}
                    >
                      <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-pricing">
              <span className="price">${discountedPrice.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="old-price">${product.price.toFixed(2)}</span>
                  <span className="discount">(-{discountPct}%)</span>
                </>
              )}
            </div>

            <ul className="product-info">
              <li>
                <strong>Code:</strong> {id}
              </li>
              <li>
                <strong>In Stock:</strong>{" "}
                <span className={`available`}>
                  {product.stock ? "Available ✓" : "Out of stock ✗"}
                </span>
              </li>
              {product.warranty && (
                <li>
                  <strong>Warranty:</strong> {product.warranty} Years
                </li>
              )}
              {product.brand && (
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
              )}
              {product.category && (
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
              )}
              {product.storage && (
                <li>
                  <strong>Storage:</strong> {product.storage}
                </li>
              )}
            </ul>

            <div className="quantity-section">
              <div className="qty-controls">
                <button
                  onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <input type="number" value={amount} readOnly />
                <button onClick={() => setAmount(amount + 1)}>+</button>
              </div>
              <button
                className="add-to-cart"
                onClick={() => {
                  if (product && id) {
                    setLoading(true);
                    addToCart({
                      id: id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl,
                      discount: product.discount,
                    });
                    setTimeout(() => setLoading(false), 1000);
                  }
                }}
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : "Add to Cart"}
              </button>
            </div>

            <div className="product-description">
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <SimilarProducts products={similarProducts} />
        )}
      </div>
      <Footer />
    </>
  );
}
