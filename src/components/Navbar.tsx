import "./Navbar.css";
import { FaSearch, FaRegUser, FaBars } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";
import CartDropdown from "./CartDropdown";
import { Link, useNavigate, useMatch } from "react-router-dom";

function Navbar() {
  const { getTotalItems } = useCart();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const match = useMatch("/store/:category");
  const categoryFromURL = match?.params.category || "all";
  const [search, setSearch] = useState("");

  const handleCartClick = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  const handleSearch = () => {
    // if search input is empty does nothing if true navigates using useMatch()
    if (!search) {
      // if search is triggered when empty it resets search
      navigate(`/store/${categoryFromURL}`);
      return;
    }
    navigate(`/store/${categoryFromURL}?search=${search}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartDropdownOpen(false);
      }
    };

    if (isCartDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCartDropdownOpen]);

  return (
    <div className="navbar-main">
      <div className="page-container">
        <div className="top-part">
          <div className="left-part">
            <div className="title">
              <FaBars size={40} />
              <Link className="textd" to={"/"}>
                <span>AS-MART</span>
              </Link>
            </div>
          </div>

          <div className="center-part">
            <div className="search">
              <FaSearch size={24} onClick={handleSearch} />
              <input
                type="text"
                placeholder="Search essentials, groceries and more..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>

          <div className="right-part">
            <div className="sign">
              <FaRegUser size={24} />
              <Link className="textd" to={"/auth/register"}>
                <span>Sign Up / Sign In</span>
              </Link>
            </div>
            <p className="nav-border"></p>
            <div className="cart" ref={cartRef} onClick={handleCartClick}>
              <MdOutlineShoppingCart size={30} />
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

        <div className="bottom-part">
          <div className="nav-item-with-dropdown">
            <div className="nav-item">
              <span>Groceries</span>
              <FiChevronDown size={18} className="dropdown-icon" />
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
              <FiChevronDown size={18} className="dropdown-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
