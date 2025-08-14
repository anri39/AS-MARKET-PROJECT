import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import "./CartDropdown.css";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-dropdown-overlay" />
      <div className="cart-dropdown">
        <div className="cart-dropdown-header">
          <h3>Shopping Cart ({getTotalItems()} items)</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-dropdown">
            <FaShoppingCart size={40} color="#ccc" />
            <p>Your cart is empty</p>
            <button className="start-shopping-btn" onClick={handleViewCart}>
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-dropdown-items">
              {cartItems.slice(0, 3).map((item) => {
                const discount = item.discount ? parseFloat(item.discount) : 0;
                const discountedPrice = item.price - (item.price * discount / 100);
                const totalPrice = discountedPrice * item.quantity;

                return (
                  <div key={item.id} className="cart-dropdown-item">
                    <div className="item-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-price-info">
                        <span className="current-price">${discountedPrice.toFixed(2)}</span>
                        {item.discount && (
                          <span className="discount-badge">-{item.discount}%</span>
                        )}
                      </div>
                      
                      <div className="item-quantity-controls">
                        <div className="quantity-controls">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-total">
                      <span className="total-price">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
              
              {cartItems.length > 3 && (
                <div className="more-items">
                  <p>+{cartItems.length - 3} more items</p>
                </div>
              )}
            </div>

            <div className="cart-dropdown-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span className="subtotal">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="cart-dropdown-actions">
                <button className="view-cart-btn" onClick={handleViewCart}>
                  View Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
