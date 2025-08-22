import "./Secondcategory.css";
import { FiChevronRight } from "react-icons/fi";
import Circlecard from "./Circlecard";
import galaxyM33 from "../assets/samsungM33.png";
import blender from "../assets/blender.webp";
import washingmachine from "../assets/washingmachine.avif";
import sofa from "../assets/sofa.png";
import watch from "../assets/watch.png";
import plant from "../assets/plant.png";
import necklace from "../assets/necklace.png";
import { Link } from "react-router-dom";

function Secondcategory() {
  return (
    <div className="second-category-wrap">
      <div className="second-category-header">
        <p>
          Shops from <span className="highlight-second">Top Categories</span>
        </p>
        <div className="view-all">
          <Link to={"store/Electronics"}>
            <span>View All</span>
          </Link>
          <FiChevronRight size={16} className="righticon" />
        </div>
      </div>
      <div className="second-category-footer">
        <Link
          to="/store/Electronics"
          state={{ preselectedFilters: { Class: ["Phone"] } }}
        >
          <Circlecard image={galaxyM33} name="Mobile" />
        </Link>
        <Link to={"/store/Cosmetics"}>
          <Circlecard image={blender} name="Cosmetics" />
        </Link>
        <Link to={"/store/Electronics"}>
          {" "}
          {/* needs to get changed later to Washingmachine preselect */}
          <Circlecard image={washingmachine} name="Electronics" />
        </Link>
        <Link to={"/store/Home%20&%20Kitchen"}>
          <Circlecard image={sofa} name="Furniture" />
        </Link>
        <Link
          to="/store/Electronics"
          state={{ preselectedFilters: { Class: ["Watch"] } }}
        >
          <Circlecard image={watch} name="Watches" />
        </Link>
        <Link to="/store/Home%20Improvement">
          <Circlecard image={plant} name="Decor" />
        </Link>
        <Link to="/store/Fashion">
          <Circlecard image={necklace} name="Accessories" />
        </Link>
      </div>
    </div>
  );
}

export default Secondcategory;
