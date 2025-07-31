import "./Navbar.css";
import { FaBars, FaSearch, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function Navbar() {
  return (
    <div className="navbar-main">
      <div className="top-part">
        {/* Left - Logo */}
        <div className="left-part">
          <div className="title">
            <FaBars size={40} />
            <span>AS-MART</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="center-part">
          <div className="search">
            <FaSearch size={20} />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
            />
            <FaBars size={24} />
          </div>
        </div>

        {/* Right - Sign and Cart */}
        <div className="right-part">
          <div className="sign">
            <FaRegUser size={30} />
            <span>Sign Up/Sign In</span>
          </div>
          <div className="cart">
            <MdOutlineShoppingCart size={30} />
            <span>Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
