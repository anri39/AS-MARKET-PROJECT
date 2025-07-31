import "./Navbar.css";
import { FaBars, FaSearch, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

function Navbar() {
  return (
    <div className="navbar-main">
      <div className="top-part">
        {/* Left - Logo */}
        <div className="left-part">
          <div className="title">
            <FaBars size={70} />
            <span>AS-MART</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="center-part">
          <div className="search">
            <FaSearch size={30} />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
            />
            <FaBars size={30} />
          </div>
        </div>

        {/* Right - Sign and Cart */}
        <div className="right-part">
          <div className="sign">
            <FaRegUser size={30} />
            <span>Sign Up/Sign In</span>
          </div>
          <p className="nav-border"></p>
          <div className="cart">
            <MdOutlineShoppingCart size={40} />
            <span>Cart</span>
          </div>
        </div>
      </div>

      {/* Bottom nav with dropdown */}
      <div className="bottom-part">
        <div className="nav-item-with-dropdown">
          <div className="nav-item">
            <span>Groceries</span>
            <FiChevronDown size={20} className="dropdown-icon" />
          </div>
        </div>

        <div className="nav-item">
          <span>Premium Fruits</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Home & Kitchen</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Fashion</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Electronics</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Beauty</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Home Improvement</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>

        <div className="nav-item">
          <span>Sports, Toys & Luggage</span>
          <FiChevronDown size={20} className="dropdown-icon" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
