import "./Secondcategory.css";
import { FiChevronRight } from "react-icons/fi";
import Circlecard from "./Circlecard";
import galaxyM33 from "../assets/samsungM33.png";
import blender from "../assets/blender.png";
import washingmachine from "../assets/washingmachine.avif";
import sofa from "../assets/sofa.png";
import watch from "../assets/watch.png";
import plant from "../assets/plant.png";
import necklace from "../assets/necklace.png";

function Secondcategory() {
  return (
    <div className="second-category-wrap">
      <div className="second-category-header">
        <p>
          Shops from <span className="highlight-second">Top Categories</span>
        </p>
        <div className="view-all">
          <span>View All</span>
          <FiChevronRight size={16} className="righticon" />
        </div>
      </div>
      <div className="second-category-footer">
        <Circlecard image={galaxyM33} name="Mobile" />
        <Circlecard image={blender} name="Cosmetics" />
        <Circlecard image={washingmachine} name="Electronics" />
        <Circlecard image={sofa} name="Furniture" />
        <Circlecard image={watch} name="Watches" />
        <Circlecard image={plant} name="Decor" />
        <Circlecard image={necklace} name="Accessories" />
      </div>
    </div>
  );
}

export default Secondcategory;
