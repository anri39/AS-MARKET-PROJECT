import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function UpdateProducts() {
  async function updateAllProducts() {
    const productsSnapshot = await getDocs(collection(db, "products"));

    for (const productDoc of productsSnapshot.docs) {
      const data = productDoc.data();

      const updates: any = {};

      if (!("brand" in data)) updates.brand = ""; // Example on how to update

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, "products", productDoc.id), updates);
      }
    }

    alert("Updated all products with missing fields");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin: Update Products</h2>
      <button onClick={updateAllProducts}>Update All Products</button>
      <p>Run this once and then remove the component.</p>
    </div>
  );
}
