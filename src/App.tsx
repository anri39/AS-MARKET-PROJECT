import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startingpage from "./pages/Startingpage";
import StorePage from "./pages/StorePage";
import CardCreation from "./pages/CardCreation";
import ProductPage from "./pages/productPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Startingpage />} />
        <Route path="/store/:category" element={<StorePage />} />
        <Route path="/create" element={<CardCreation />} />
        <Route path="/store/:category/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
