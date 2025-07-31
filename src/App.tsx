import Card from "./components/Card";
import samsungImage from "./assets/samsung.png";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Card
        image={samsungImage}
        title="Galaxy S22 Ultra"
        price={1200}
        discount="10%"
      />
      <Card
        image={samsungImage}
        title="Galaxy S22 Ultra"
        price={1200}
        discount="30%"
      />
      <Navbar />

      <Footer />
    </>
  );
}

export default App;
