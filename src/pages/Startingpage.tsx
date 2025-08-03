import Dailyessentials from "../components/Dailyessentials";
import Footer from "../components/Footer";
import Phoneslider from "../components/Phoneslider";
import Slider from "../components/Slider";
import Firstcategory from "../components/Firstcategory";
import Secondcategory from "../components/Secondcategory";
import Navbar from "../components/Navbar";

function Startingpage() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Slider />
        <Firstcategory />
        <Secondcategory />
        <Phoneslider />
        <Dailyessentials />
      </div>
      <Footer />
    </>
  );
}

export default Startingpage;
