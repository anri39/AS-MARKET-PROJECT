import "./CardCreation.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.tsx";
import { useState } from "react";
import { db } from "../firebase/firebase.ts";
import { collection, addDoc } from "firebase/firestore";

function CardCreation() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [stock, setStock] = useState(false);
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !description || !imageUrl || !category) {
      alert("Please fill out all required fields.");
      return;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    if (
      discount &&
      (isNaN(parseFloat(discount)) ||
        parseFloat(discount) > 100 ||
        parseFloat(discount) < 0)
    ) {
      alert(
        "Please enter a valid discount between 0 and 100 or leave it empty."
      );
      return;
    }
    addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      description,
      imageUrl,
      stock,
      discount: discount || "0%",
      category,
    })
      .then(() => {
        alert("Product successfully added!");
        setName("");
        setPrice("");
        setDescription("");
        setImgUrl("");
        setStock(false);
        setDiscount("");
        setCategory("");
      })
      .catch((error) => {
        console.log("Error adding to DB", error);
        alert("There was an error adding the product. Please try again.");
      });
  };

  const categories = [
    "Groceries",
    "Premium Fruits",
    "Home & Kitchen",
    "Fashion",
    "Electronics",
    "Beauty",
    "Home Improvement",
    "Sports, Toys & Luggage",
  ];

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="card-creation-container">
          <div className="card-creation-header">
            <h1>Create New Product</h1>
            <p>Add a new product to your inventory</p>
          </div>

          <form className="card-creation-form" onSubmit={handleAddProduct}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Product Title *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter product title"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discount">Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="imageUrl">Image URL *</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                required
                value={imageUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="stock">In Stock</label>
              <input
                type="checkbox"
                id="stock"
                name="stock"
                checked={stock}
                onChange={() => setStock(!stock)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CardCreation;
