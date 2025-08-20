import "./Firstcategory.css";
import { FiChevronRight } from "react-icons/fi";
import Card from "./Card";
import samsung from "../assets/samsung.png";
import samsungM13 from "../assets/samsungM13.png";
import samsungM33 from "../assets/samsungM33.png";
import samsungM53 from "../assets/samsungM53.png";
import samsunggreen from "../assets/samsunggreen.avif";
import { Link } from "react-router-dom";

function Firstcategory() {
  return (
    <div className="first-category-wrap">
      <div className="first-category-header">
        <p>
          Grab the best deal on{" "}
          <span className="highlight-first">Smartphones</span>
        </p>
        <div className="view-all">
          <Link
            to="/store/Electronics"
            state={{ preselectedFilters: { Class: ["Phone"] } }}
          >
            <span>View All</span>
          </Link>
          <FiChevronRight size={16} className="righticon" />
        </div>
      </div>
      <div className="first-category-footer">
        <Card
          image={samsung}
          title="Galaxy s22 Ultra"
          price={1500}
          discount="20%"
          category="Electronics"
          id="t1hmjxcg5ghpVtXIUq3P"
        />
        <Card
          image={samsungM13}
          title="Galaxy M13 (4GB | 64GB)"
          price={1000}
          discount="20%"
          category="Electronics"
          id="zgj9oUX6UeM00JlnWWIM"
        />
        <Card
          image={samsungM33}
          title="Galaxy M33 (4GB | 64GB)"
          price={1200}
          discount="20%"
          category="Electronics"
          id="OXHrlwMKy1rIQK3MPKgg"
        />
        <Card
          image={samsungM53}
          title="Galaxy M53 (4GB | 64GB)"
          price={1400}
          discount="20%"
          category="Electronics"
          id="XqGwWzEjMioXuSs0IgZV"
        />
        <Card
          image={samsunggreen}
          title="Galaxy s22 Ultra"
          price={1500}
          discount="20%"
          category="Electronics"
          id="t1hmjxcg5ghpVtXIUq3P"
        />
      </div>
    </div>
  );
}

export default Firstcategory;
