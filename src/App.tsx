import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startingpage from "./pages/Startingpage";
import StorePage from "./pages/StorePage";
import CardCreation from "./pages/CardCreation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Startingpage />} />
        <Route path="/store/:category" element={<StorePage />} />
        <Route path="/create" element={<CardCreation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
