import { useNavigate } from "react-router-dom";
import "./Card.css";

type CardProps = {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number;
  discount?: string;
};

function Card({ id, category, image, title, price, discount }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/store/${category}/${id}`);
  };

  const discountNum =
    discount && parseFloat(discount.replace("%", "")) > 0
      ? parseFloat(discount.replace("%", ""))
      : 0;

  const hasDiscount = discountNum > 0;

  const discountedPrice = hasDiscount
    ? price - (price * discountNum) / 100
    : price;

  const discountDisplay = hasDiscount ? `${discountNum}%` : "";

  return (
    <div
      className="card-main"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-img">
        <img src={image} alt={title} />
        {hasDiscount && (
          <p className="imgdisc">
            {discountDisplay} <br /> OFF
          </p>
        )}
      </div>
      <div className="card-text">
        <p className="title">{title}</p>
        <div className="prices">
          {hasDiscount ? (
            <>
              <p className="oldprice">${price.toFixed(2)}</p>
              <p
                className="newprice"
                style={{
                  textDecoration: hasDiscount ? "line-through" : "none",
                }}
              >
                ${discountedPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="newprice" style={{ textDecoration: "none" }}>
              ${discountedPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="border"></div>
        <p className="discount">
          {hasDiscount ? `Save ${discountDisplay}` : "Best Selling"}
        </p>
      </div>
    </div>
  );
}

export default Card;
