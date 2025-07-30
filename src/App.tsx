import Card from "./components/Card";
import samsungImage from "./assets/samsung.png";
import "./App.css";

function App() {
  return (
    <>
      <Card
        image={samsungImage}
        title="Galaxy S22 Ultra"
        price={1200}
        discount="10%"
      />
    </>
  );
}

export default App;
