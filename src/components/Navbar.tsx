import "./Navbar.css";
import { FaSearch, FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import CartDropdown from "./CartDropdown";
import { Link, useNavigate, useMatch } from "react-router-dom";
import Burgerbar from "./BurgerBar";

function Navbar() {
  const { getTotalItems } = useCart();
  const { user } = useUser();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const match = useMatch("/store/:category");
  const categoryFromURL = match?.params.category || "all";
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleCartClick = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  const closeCartDropdown = () => {
    setIsCartDropdownOpen(false);
  };

  const handleSearch = () => {
    if (!search) {
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
              <FaBars size={40} onClick={toggleMenu} />
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
            <div className="user" onClick={() => navigate("/auth/register")}>
              <FaRegUser size={30} />
              <span>
                {user ? `Hello ${user.username}` : "Sign Up/Sign In"}
              </span>
            </div>
            <div className="nav-border"></div>
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
          {[
            "Groceries",
            "Premium Fruits",
            "Home & Kitchen",
            "Fashion",
            "Electronics",
            "Beauty",
            "Home Improvement",
            "Sports, Toys & Luggage",
          ].map((item) => (
            <Link
              key={item}
              className="nav-item textd"
              to={`/store/${encodeURIComponent(item)}`}
            >
              <span>{item}</span>
            </Link>
          ))}
        </div>
      </div>
      <Burgerbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {isMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Navbar;
