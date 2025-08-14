import "./Navbar.css";
import { FaBars, FaSearch, FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CartDropdown from "./CartDropdown";

function Navbar() {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleCartClick = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };

    if (isCartDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCartDropdownOpen]);

  return (
    <div className="navbar-main">
      <div className="page-container">
        {/* Top Section */}
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

          {/* Right - Sign In and Cart */}
          <div className="right-part">
            <div className="sign">
              <FaRegUser size={30} />
              <span>Sign Up/Sign In</span>
            </div>
            <p className="nav-border"></p>
            <div className="cart" ref={cartRef} onClick={handleCartClick}>
              <MdOutlineShoppingCart size={40} />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
              <CartDropdown 
                isOpen={isCartDropdownOpen} 
                onClose={closeCartDropdown} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-part">
          <div className="nav-item-with-dropdown">
            <div className="nav-item">
              <span>Groceries</span>
              <FiChevronDown size={20} className="dropdown-icon" />
            </div>
          </div>

          {[
            "Premium Fruits",
            "Home & Kitchen",
            "Fashion",
            "Electronics",
            "Beauty",
            "Home Improvement",
            "Sports, Toys & Luggage",
          ].map((item) => (
            <div className="nav-item" key={item}>
              <span>{item}</span>
              <FiChevronDown size={20} className="dropdown-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
