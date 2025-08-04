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
    arrows: false,
  };

  return (
    <header className="electronics-slider-wrapper">
      <div className="electronics-category">
        <p>
          Top <span className="electronics-highlight">Electronics Brands</span>
        </p>
        <div className="electronics-view-all">
          <span>View All</span>
          <FiChevronRight size={16} className="electronics-righticon" />
        </div>
      </div>

      <div className="electronics-slider">
        <Slider {...settings}>
          <div className="electronics-card" style={{ backgroundColor: "" }}>
            <img src={samsung} alt="Samsung" className="electronics-image" />
          </div>
          <div
            className="electronics-card"
            style={{ backgroundColor: "#FFF3C0" }}
          >
            <img src={samsung} alt="Samsung" className="electronics-image" />
          </div>
          <div
            className="electronics-card"
            style={{ backgroundColor: "#FFE3D1" }}
          >
            <img src={samsung} alt="Samsung" className="electronics-image" />
          </div>
          <div
            className="electronics-card"
            style={{ backgroundColor: "#E3F1FF" }}
          >
            <img src={samsung} alt="Samsung" className="electronics-image" />
          </div>
        </Slider>
      </div>
    </header>
  );
}

export default ElectronicsSlider;
