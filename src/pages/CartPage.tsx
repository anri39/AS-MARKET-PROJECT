import "./CartPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="cart-page">
          <div className="cart-container">
            <div className="cart-header">
              <button className="back-button" onClick={handleContinueShopping}>
                <FaArrowLeft size={20} />
                <span>Continue Shopping</span>
              </button>
              <h1 className="cart-title">Shopping Cart</h1>
            </div>
            
            <div className="empty-cart">
              <div className="empty-cart-content">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <button className="back-button" onClick={handleContinueShopping}>
              <FaArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
            <h1 className="cart-title">Shopping Cart ({cartItems.length} items)</h1>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => {
                const discount = item.discount ? parseFloat(item.discount) : 0;
                const discountedPrice = item.price - (item.price * discount / 100);
                const totalPrice = discountedPrice * item.quantity;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-price-info">
                        <span className="current-price">${discountedPrice.toFixed(2)}</span>
                        {item.discount && (
                          <>
                            <span className="original-price">${item.price.toFixed(2)}</span>
                            <span className="discount-badge">-{item.discount}%</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="item-quantity">
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
                    </div>

                    <div className="item-total">
                      <span className="total-price">${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-items">
                  {cartItems.map((item) => {
                    const discount = item.discount ? parseFloat(item.discount) : 0;
                    const discountedPrice = item.price - (item.price * discount / 100);
                    return (
                      <div key={item.id} className="summary-item">
                        <div className="summary-item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                        </div>
                        <span className="item-price">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="summary-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="total-row final-total">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
