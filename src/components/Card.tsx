import "./Card.css";

type cardProps = {
  image: string;
  title: string;
  price: number;
  discount?: string;
};

function Card({ image, title, price, discount }: cardProps) {
  // Ensure discount is a number
  const discountNum = discount ? parseFloat(discount.replace("%", "")) : 0;
  const discountedPrice = price - (price * discountNum) / 100;

  // Always format discount as a string with "%"
  const discountDisplay = discount
    ? discount.includes("%")
      ? discount
      : discount + "%"
    : "";

  return (
    <div className="card-main">
      <div className="card-img">
        <img src={image} alt={title} />
        {discount && (
          <p className="imgdisc">
            {discountDisplay} <br /> OFF
          </p>
        )}
      </div>
      <div className="card-text">
        <p className="title">{title}</p>
        <div className="prices">
          <p className="oldprice">${discountedPrice.toFixed(2)}</p>
          <p className="newprice">${price.toFixed(2)}</p>
        </div>
        <div className="border"></div>
        {discount && <p className="discount">Save {discountDisplay}</p>}
      </div>
    </div>
  );
}

export default Card;
