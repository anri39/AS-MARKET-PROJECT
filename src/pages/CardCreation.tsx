import "./CardCreation.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.tsx";
import { useState } from "react";
import { db } from "../firebase/firebase.ts";
import { collection, addDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";

function CardCreation() {
  const { user, loading } = useUser();
  if (loading) return null;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

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
  const [origin, setOrigin] = useState("");
  const [type, setType] = useState("");
  const [skinType, setSkinType] = useState("");
  const [powerSource, setPowerSource] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [warranty, setWarranty] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [fruitType, setFruitType] = useState("");
  const [electronicsClass, setElectronicsClass] = useState("");

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !description || !imageUrl || !category || !brand)
      return;
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) return;
    if (
      discount &&
      (isNaN(parseFloat(discount)) ||
        parseFloat(discount) > 100 ||
        parseFloat(discount) < 0)
    )
      return;

    const productData: any = {
      name,
      price: parseFloat(price),
      description,
      imageUrl,
      stock,
      discount: discount || "0%",
      category,
      brand,
      image2: image2 || "",
      image3: image3 || "",
      image4: image4 || "",
    };

    if (category === "Clothing" || category === "Fashion") {
      productData.size = size;
      productData.color = color;
    }
    if (category === "Electronics") {
      productData.storage = storage;
      productData.cooler = cooler;
      productData.electronicsClass = electronicsClass;
      productData.warranty = warranty;
    }
    if (category === "Premium Fruits") {
      productData.origin = origin;
      productData.organic = organic;
      productData.fruitType = fruitType;
      productData.brand = brand;
      productData.warranty = warranty;
    }
    if (category === "Beauty") {
      productData.type = type;
      productData.skinType = skinType;
    }
    if (category === "Home Improvement") {
      productData.powerSource = powerSource;
      productData.warranty = warranty;
    }
    if (category === "Sports, Toys & Luggage") {
      productData.ageGroup = ageGroup;
      productData.color = color;
    }

    await addDoc(collection(db, "products"), productData);

    // Reset all fields
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
    setOrigin("");
    setType("");
    setSkinType("");
    setPowerSource("");
    setAgeGroup("");
    setWarranty("");
    setImage2("");
    setImage3("");
    setImage4("");
    setFruitType("");
    setElectronicsClass("");
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
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
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter brand"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  required
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="imageUrl">Image URL *</label>
              <input
                type="url"
                id="imageUrl"
                required
                value={imageUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Enter product description"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="stock">In Stock</label>
              <input
                type="checkbox"
                id="stock"
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
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter color"
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
                    value={cooler}
                    onChange={(e) => setCooler(e.target.value)}
                  >
                    <option value="">Select cooler type</option>
                    <option value="Air">Air</option>
                    <option value="Liquid">Liquid</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="electronicsClass">Class</label>
                  <input
                    type="text"
                    id="electronicsClass"
                    value={electronicsClass}
                    onChange={(e) => setElectronicsClass(e.target.value)}
                    placeholder="Enter product class"
                  />
                </div>
              </>
            )}

            {category === "Premium Fruits" && (
              <>
                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <select
                    id="origin"
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
                    value={organic}
                    onChange={(e) => setOrganic(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fruitType">Type</label>
                  <select
                    id="fruitType"
                    value={fruitType}
                    onChange={(e) => setFruitType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Tart">Tart</option>
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter type"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skinType">Skin Type</label>
                  <input
                    type="text"
                    id="skinType"
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                    placeholder="Enter skin type"
                  />
                </div>
              </>
            )}

            {category === "Home Improvement" && (
              <div className="form-group">
                <label htmlFor="powerSource">Power Source</label>
                <input
                  type="text"
                  id="powerSource"
                  value={powerSource}
                  onChange={(e) => setPowerSource(e.target.value)}
                  placeholder="Enter power source"
                />
              </div>
            )}

            {category === "Sports, Toys & Luggage" && (
              <>
                <div className="form-group">
                  <label htmlFor="ageGroup">Age Group</label>
                  <input
                    type="text"
                    id="ageGroup"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    placeholder="Enter age group"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter color"
                  />
                </div>
              </>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image2">Preview Image 2</label>
                <input
                  type="url"
                  id="image2"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder="https://example.com/image2.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image3">Preview Image 3</label>
                <input
                  type="url"
                  id="image3"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder="https://example.com/image3.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image4">Preview Image 4</label>
                <input
                  type="url"
                  id="image4"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                  placeholder="https://example.com/image4.jpg"
                />
              </div>
            </div>

            {(category === "Electronics" ||
              category === "Home Improvement" ||
              category === "Premium Fruits") && (
              <div className="form-group">
                <label htmlFor="warranty">Warranty</label>
                <input
                  type="text"
                  id="warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="Enter warranty"
                />
              </div>
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
