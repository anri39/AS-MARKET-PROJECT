import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">

        <div className="footer-section contact">
          <h2 className="logo">AS MARKET</h2>
          <p>📱 Anri<br />+995 596 10 03 99</p>
          <p>📱 Saba<br />+995 579 04 13 01</p>
        </div>

        <div className="footer-section">
          <h4>Most Popular Categories</h4>
          <ul>
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables & Fruits</li>
            <li>Snacks & Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Services</h4>
          <ul>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation & Return Policy</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Footer;
