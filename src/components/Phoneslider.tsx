import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Phoneslider.css";
import samsung from "../assets/samsung.png";
import { FiChevronRight } from "react-icons/fi";

function ElectronicsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <header className="mainwrap">
      <div className="category">
        <p>
          Top <span className="highlight">Electronics Brands</span>
        </p>
        <div className="view-all">
          <span>View All</span>
          <FiChevronRight size={16} className="righticon" />
        </div>
      </div>

      <div className="electronics-slider">
        <Slider {...settings}>
          <div className="card" style={{ backgroundColor: "#2E2E2E" }}>
            <img src={samsung} alt="iPhone" className="product-image" />
          </div>

          <div className="card" style={{ backgroundColor: "#FFF3C0" }}>
            <img src={samsung} alt="iPhone" className="product-image" />
          </div>

          <div className="card" style={{ backgroundColor: "#FFE3D1" }}>
            <img src={samsung} alt="iPhone" className="product-image" />
          </div>
        </Slider>
      </div>
    </header>
  );
}

export default ElectronicsSlider;
