import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import React from "react";
import Slider from "react-slick";

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
          <img src="" alt="Slide 1" className="slider-image" />
        </div>
        <div>
          <img src="" alt="Slide 2" className="slider-image" />
        </div>
      </Slider>
    </div>
  );
};

export default CustomSlider;
