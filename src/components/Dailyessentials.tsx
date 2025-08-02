import "./Dailyessentials.css";
import { FiChevronRight } from "react-icons/fi";
import basket from "../assets/basket.webp";
import vegetables from "../assets/vegetables.webp";
import fruits from "../assets/fruits.png";
import strawberry from "../assets/strawberry.webp";
import mango from "../assets/mango.png";
import cherry from "../assets/cherry.webp";

function Dailyessentials() {
  return (
    <div className="category-wrap">
      <div className="category-header">
        <p>
          Daily <span className="highlight">Essentials</span>
        </p>
        <div className="view-all">
          <span>View All</span>
          <FiChevronRight size={16} className="righticon" />
        </div>
      </div>
      <div className="category-footer">
        <div className="item-card">
          <div className="item-card-img">
            <img src={basket} alt="Daily Essentials" className="item-card-image" />
          </div>
          <p className="item-card-title">Daily Essentials</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>

        <div className="item-card">
          <div className="item-card-img">
            <img src={vegetables} alt="Vegetables" className="item-card-image" />
          </div>
          <p className="item-card-title">Vegetables</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>

        <div className="item-card">
          <div className="item-card-img">
            <img src={fruits} alt="Fruits" className="item-card-image" />
          </div>
          <p className="item-card-title">Fruits</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>

        <div className="item-card">
          <div className="item-card-img">
            <img src={strawberry} alt="Strawberry" className="item-card-image" />
          </div>
          <p className="item-card-title">Strawberry</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>

        <div className="item-card">
          <div className="item-card-img">
            <img src={mango} alt="Mango" className="item-card-image" />
          </div>
          <p className="item-card-title">Mango</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>

        <div className="item-card">
          <div className="item-card-img">
            <img src={cherry} alt="Cherry" className="item-card-image" />
          </div>
          <p className="item-card-title">Cherry</p>
          <p className="item-card-discount">UP to 50% OFF</p>
        </div>
      </div>
    </div>
  );
}

export default Dailyessentials;
