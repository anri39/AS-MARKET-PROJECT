import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function UpdateProducts() {
  async function updateAllProducts() {
    const productsSnapshot = await getDocs(collection(db, "products"));

    for (const productDoc of productsSnapshot.docs) {
      const data = productDoc.data();
      const updates: any = {};

      if (!("image2" in data)) updates.image2 = "";
      if (!("image3" in data)) updates.image3 = "";
      if (!("image4" in data)) updates.image4 = "";

      if (
        data.category === "Electronics" ||
        data.category === "Home Improvement" ||
        data.category === "Premium Fruits"
      ) {
        if (!("warranty" in data)) updates.warranty = "";
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, "products", productDoc.id), updates);
      }
    }

    alert("Updated all products with missing warranty and image fields");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin: Update Products</h2>
      <button onClick={updateAllProducts}>Update All Products</button>
      <p>Run this once and then remove the component.</p>
    </div>
  );
}
