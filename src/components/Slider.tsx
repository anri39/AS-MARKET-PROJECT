import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import React from "react";
import Slider from "react-slick";
import macbanner from "../assets/macbanner.jpg";
import saledeals from "../assets/salebanner.webp";
import techdeals from "../assets/techdeals.webp";
import samsungbanner from "../assets/samsungbanner.png";
import samsungwatches from "../assets/samsungwatchesbanner.png";
import { Link } from "react-router-dom";

const CustomSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        paddingTop: "50px",
      }}
    >
      <Slider {...settings}>
        <div>
          <Link
            to="/store/Electronics"
            state={{
              preselectedFilters: { Brand: ["Samsung"], Class: ["Phone"] },
            }}
          >
            <img src={samsungbanner} alt="Slide 1" className="slider-image" />
          </Link>
        </div>
        <div>
          <Link
            to="/store/Electronics"
            state={{
              preselectedFilters: { Brand: ["Samsung"], Class: ["Watch"] },
            }}
          >
            <img src={samsungwatches} alt="Slide 2" className="slider-image" />
          </Link>
        </div>
        <div>
          <Link
            to="/store/Electronics"
            state={{
              preselectedFilters: { Brand: ["Apple"] },
            }}
          >
            <img src={macbanner} alt="Slide 3" className="slider-image" />
          </Link>
        </div>
        <div>
          <Link to="/store/Electronics">
            <img src={saledeals} alt="Slide 4" className="slider-image" />
          </Link>
        </div>
        <div>
          <Link to="/store/Electronics">
            <img src={techdeals} alt="Slide 5" className="slider-image" />
          </Link>
        </div>
      </Slider>
    </div>
  );
};

export default CustomSlider;
