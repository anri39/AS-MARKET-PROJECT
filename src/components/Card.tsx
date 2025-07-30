import "./Card.css";

type cardProps = {
  image: string;
  title: string;
  price: number;
  discount?: string;
};

function Card({ image, title, price, discount }: cardProps) {
  const discountNum = discount
    ? parseFloat(discount.replace("%", ""))
    : 0; /* to parse string to int / remove % from it for calculations */
  const discountedPrice =
    price - (price * discountNum) / 100; /* discount calculation */

  return (
    <div className="card-main">
      <div className="card-img">
        <img src={image} alt="" />
        {discount && <p className="imgdisc">{discount} OFF</p>}
      </div>
      <div className="card-text">
        <p className="title">{title}</p>
        <div className="prices">
          <p className="oldprice price">${discountedPrice.toFixed(2)}</p>
          <p className="newprice price">${price.toFixed(2)}</p>
        </div>
        <div className="border"></div>
        {discount && <p className="discount">Save {discount}</p>}
      </div>
    </div>
  );
}

export default Card;
