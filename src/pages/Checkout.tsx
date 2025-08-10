import "./Checkout.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaCreditCard, FaLock, FaArrowLeft } from "react-icons/fa";
import { MdOutlineShoppingCart, MdOutlineLocalShipping } from "react-icons/md";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

type Product = {
  imageUrl: string;
  name: string;
  price: number;
  discount?: string;
};

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  discount?: string;
};

function Checkout() {
  const [activeStep, setActiveStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    getDocs(collection(db, "products")).then((res) => {
      setProducts(res.docs.map((doc) => doc.data() as Product));
    });
  }, []);

  const cartItems: CartItem[] = products.slice(0, 3).map((product, index) => ({
    id: index + 1,
    image: product.imageUrl,
    name: product.name,
    price: product.price,
    quantity: Math.floor(Math.random() * 2) + 1, 
    discount: product.discount,
  }));

  const subtotal = cartItems.reduce((sum, item) => {
    const discount = item.discount ? parseFloat(item.discount.replace("%", "")) : 0;
    const discountedPrice = item.price - (item.price * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const shipping = 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <>
      <div className="checkout-container">
        <Navbar />
      </div>

      <div className="checkout-content">
        <div className="checkout-header">
          <button className="back-button">
            <FaArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>

        <div className="checkout-main">
          <div className="checkout-form-section">
            {}
            <div className="checkout-steps">
              <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Shipping</span>
              </div>
              <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Payment</span>
              </div>
              <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <span>Review</span>
              </div>
            </div>

            {}
            {activeStep === 1 && (
              <div className="checkout-step">
                <div className="step-header">
                  <FaMapMarkerAlt size={24} color="#0a93cf" />
                  <h2>Shipping Information</h2>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleShippingChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleShippingChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      placeholder="Enter street address"
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => handleShippingChange('state', e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                <button 
                  className="next-button"
                  onClick={() => setActiveStep(2)}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {}
            {activeStep === 2 && (
              <div className="checkout-step">
                <div className="step-header">
                  <FaCreditCard size={24} color="#0a93cf" />
                  <h2>Payment Information</h2>
                </div>
                
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                      placeholder="Enter cardholder name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={paymentInfo.expiry}
                      onChange={(e) => handlePaymentChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="secure-payment">
                  <FaLock size={16} color="#0a93cf" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <div className="step-buttons">
                  <button 
                    className="back-step-button"
                    onClick={() => setActiveStep(1)}
                  >
                    Back to Shipping
                  </button>
                  <button 
                    className="next-button"
                    onClick={() => setActiveStep(3)}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {}
            {activeStep === 3 && (
              <div className="checkout-step">
                <div className="step-header">
                  <MdOutlineShoppingCart size={24} color="#0a93cf" />
                  <h2>Order Review</h2>
                </div>
                
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="order-items">
                    {cartItems.map((item) => {
                      const discount = item.discount ? parseFloat(item.discount.replace("%", "")) : 0;
                      const discountedPrice = item.price - (item.price * discount) / 100;
                      return (
                        <div key={item.id} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>Qty: {item.quantity}</p>
                            <p className="item-price">${discountedPrice.toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="step-buttons">
                  <button 
                    className="back-step-button"
                    onClick={() => setActiveStep(2)}
                  >
                    Back to Payment
                  </button>
                  <button 
                    className="place-order-button"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {}
          <div className="checkout-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cartItems.map((item) => {
                  const discount = item.discount ? parseFloat(item.discount.replace("%", "")) : 0;
                  const discountedPrice = item.price - (item.price * discount) / 100;
                  return (
                    <div key={item.id} className="summary-item">
                      <div className="item-info">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h4>{item.name}</h4>
                          <p>Qty: {item.quantity}</p>
                          {item.discount && (
                            <span className="discount-badge">{item.discount} OFF</span>
                          )}
                        </div>
                      </div>
                      <p className="item-price">${(discountedPrice * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="shipping-info">
                <MdOutlineLocalShipping size={20} color="#0a93cf" />
                <div>
                  <p>Free shipping on orders over $50</p>
                  <p>Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </div>
                     </div>
         </div>
       </div>
       
       <Footer />
     </>
   );
 }

export default Checkout;
