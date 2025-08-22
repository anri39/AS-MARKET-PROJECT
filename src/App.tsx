import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startingpage from "./pages/Startingpage";
import StorePage from "./pages/StorePage";
import CardCreation from "./pages/CardCreation";
import ProductPage from "./pages/productPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import LogCheck from "./pages/LogCheck";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Startingpage />} />
          <Route path="/store/:category" element={<StorePage />} />
          <Route path="/create" element={<CardCreation />} />
          <Route path="/store/:category/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/logs" element={<LogCheck />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
