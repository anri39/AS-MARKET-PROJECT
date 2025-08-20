import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Phoneslider.css";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import televisionbanner from "../assets/televisionsmallbanner.png";
import camerabanner from "../assets/camerasmallbanner.png";
import phonebanner from "../assets/phonesmallbanner.png";
import homebanner from "../assets/homesmallbanner.png";
import monitorbanner from "../assets/monitorsmallbanner.png";

function ElectronicsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const redirect = useNavigate();

  return (
    <header className="electronics-slider-wrapper">
      <div className="electronics-category">
        <p>
          Top <span className="electronics-highlight">Electronics Sales</span>
        </p>
        <div className="electronics-view-all">
          <span
            onClick={() => {
              redirect("/store/Electronics");
            }}
          >
            View All
          </span>
          <FiChevronRight size={16} className="electronics-righticon" />
        </div>
      </div>

      <div className="electronics-slider">
        <Slider {...settings}>
          <div className="electronics-card">
            <Link to={"/store/Electronics"}>
              <img
                src={monitorbanner}
                alt="Samsung"
                className="electronics-image"
              />
            </Link>
          </div>

          <div className="electronics-card">
            <Link to={"/store/Electronics"}>
              <img
                src={televisionbanner}
                alt="Samsung"
                className="electronics-image"
              />
            </Link>
          </div>

          <div className="electronics-card">
            <Link
              to="/store/Electronics"
              state={{ preselectedFilters: { Class: ["Phone"] } }}
            >
              <img
                src={phonebanner}
                alt="Samsung"
                className="electronics-image"
              />
            </Link>
          </div>

          <div className="electronics-card">
            <Link to={"/store/Electronics"}>
              <img
                src={camerabanner}
                alt="Samsung"
                className="electronics-image"
              />
            </Link>
          </div>

          <div className="electronics-card">
            <Link to={"/store/Home%20Improvement"}>
              <img
                src={homebanner}
                alt="Samsung"
                className="electronics-image"
              />
            </Link>
          </div>
        </Slider>
      </div>
    </header>
  );
}

export default ElectronicsSlider;
