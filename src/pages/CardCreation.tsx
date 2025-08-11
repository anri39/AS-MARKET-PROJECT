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
  const [brand, setBrand] = useState("");

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const [cooler, setCooler] = useState("");
  const [organic, setOrganic] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("");
  const [skinType, setSkinType] = useState("");
  const [powerSource, setPowerSource] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !description || !imageUrl || !category || !brand) {
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
    const productData: any = {
      name,
      price: parseFloat(price),
      description,
      imageUrl,
      stock,
      discount: discount || "0%",
      category,
      brand,
    };

    if (category === "Clothing" || category === "Fashion") {
      productData.size = size;
      productData.color = color;
    }
    if (category === "Electronics") {
      productData.storage = storage;
      productData.cooler = cooler;
    }
    if (category === "Groceries") {
      productData.organic = organic;
      productData.weight = weight;
    }
    if (category === "Premium Fruits") {
      productData.origin = origin;
      productData.organic = organic;
      productData.brand = brand;
    }
    if (category === "Beauty") {
      productData.type = type;
      productData.skinType = skinType;
    }
    if (category === "Home Improvement") {
      productData.powerSource = powerSource;
    }
    if (category === "Sports, Toys & Luggage") {
      productData.ageGroup = ageGroup;
      productData.color = color;
    }

    addDoc(collection(db, "products"), productData)
      .then(() => {
        alert("Product successfully added!");
        setName("");
        setPrice("");
        setDescription("");
        setImgUrl("");
        setStock(false);
        setDiscount("");
        setCategory("");
        setBrand("");
        setSize("");
        setColor("");
        setStorage("");
        setCooler("");
        setOrganic("");
        setWeight("");
        setOrigin("");
        setType("");
        setSkinType("");
        setPowerSource("");
        setAgeGroup("");
      })
      .catch(() => {
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
                  id="title"
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
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Enter brand"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

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

            {(category === "Clothing" || category === "Fashion") && (
              <>
                <div className="form-group">
                  <label htmlFor="size">Size</label>
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">Select size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </>
            )}

            {category === "Electronics" && (
              <>
                <div className="form-group">
                  <label htmlFor="storage">Storage</label>
                  <select
                    id="storage"
                    name="storage"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                  >
                    <option value="">Select storage</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cooler">Cooler Type</label>
                  <select
                    id="cooler"
                    name="cooler"
                    value={cooler}
                    onChange={(e) => setCooler(e.target.value)}
                  >
                    <option value="">Select cooler type</option>
                    <option value="Air">Air</option>
                    <option value="Liquid">Liquid</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </>
            )}

            {category === "Groceries" && (
              <>
                <div className="form-group">
                  <label htmlFor="organic">Organic</label>
                  <select
                    id="organic"
                    name="organic"
                    value={organic}
                    onChange={(e) => setOrganic(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <select
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="250g">250g</option>
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                    <option value="2kg+">2kg+</option>
                  </select>
                </div>
              </>
            )}

            {category === "Premium Fruits" && (
              <>
                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <select
                    id="origin"
                    name="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Local">Local</option>
                    <option value="Imported">Imported</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="organic">Organic</label>
                  <select
                    id="organic"
                    name="organic"
                    value={organic}
                    onChange={(e) => setOrganic(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </>
            )}

            {category === "Beauty" && (
              <>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Enter type (e.g. Cream, Serum)"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skinType">Skin Type</label>
                  <input
                    type="text"
                    id="skinType"
                    name="skinType"
                    placeholder="Enter skin type"
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                  />
                </div>
              </>
            )}

            {category === "Home Improvement" && (
              <>
                <div className="form-group">
                  <label htmlFor="powerSource">Power Source</label>
                  <input
                    type="text"
                    id="powerSource"
                    name="powerSource"
                    placeholder="Enter power source"
                    value={powerSource}
                    onChange={(e) => setPowerSource(e.target.value)}
                  />
                </div>
              </>
            )}

            {category === "Sports, Toys & Luggage" && (
              <>
                <div className="form-group">
                  <label htmlFor="ageGroup">Age Group</label>
                  <input
                    type="text"
                    id="ageGroup"
                    name="ageGroup"
                    placeholder="Enter age group (e.g. Kids, Adults)"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </>
            )}

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
