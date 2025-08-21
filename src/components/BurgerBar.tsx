import { Link, useNavigate } from "react-router-dom";
import "./BurgerBar.css";
import { signOut } from "firebase/auth";
import { useUser } from "../context/UserContext";

import {
  LuShoppingBag,
  LuApple,
  LuHouse,
  LuShirt,
  LuTv,
  LuSparkles,
  LuHammer,
  LuShoppingCart,
  LuLogOut,
} from "react-icons/lu";
import { auth } from "../firebase/firebase";
import { FiPlusSquare, FiActivity } from "react-icons/fi";

interface BurgerbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Burgerbar: React.FC<BurgerbarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const menuItems = [
    { name: "Groceries", icon: <LuShoppingBag />, path: "/store/Groceries" },
    {
      name: "Premium Fruits",
      icon: <LuApple />,
      path: "/store/Premium%20Fruits",
    },
    {
      name: "Home & Kitchen",
      icon: <LuHouse />,
      path: "/store/Home%20&%20Kitchen",
    },
    { name: "Fashion", icon: <LuShirt />, path: "/store/Fashion" },
    { name: "Electronics", icon: <LuTv />, path: "/store/Electronics" },
    { name: "Beauty", icon: <LuSparkles />, path: "/store/Beauty" },
    {
      name: "Home Improvement",
      icon: <LuHammer />,
      path: "/store/Home%20Improvement",
    },
    {
      name: "Sports, Toys & Luggage",
      icon: <LuShoppingCart />,
      path: "/store/Sports,%20Toys%20&%20Luggage",
    },
  ];

  if (user?.role === "admin") {
    menuItems.push({
      name: "Create Product",
      icon: <FiPlusSquare />,
      path: "/create",
    });
    menuItems.push({
      name: "View Logs",
      icon: <FiActivity />,
      path: "/logs",
    });
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onClose();
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className={`burgerbarcontainer ${isOpen ? "open" : "closed"}`}>
      <div className="burgerbarheader burgerbar-row">
        <Link className="burgerbartitle" to={"/"}>
          <p>AS-MART</p>
        </Link>
        <button className="closebutton" onClick={onClose}>
          x
        </button>
      </div>

      <div className="burgerbarrows-container">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="burgerbar-row"
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          >
            {item.icon}
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <div className="logout-button">
        {user ? (
          <button onClick={handleSignOut}>
            <LuLogOut /> Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/auth/login");
              onClose();
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Burgerbar;
