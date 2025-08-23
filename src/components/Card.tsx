import { useNavigate } from "react-router-dom";
import "./Card.css";

type CardProps = {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number;
  discount?: string;
  loading?: boolean;
};

function Card({
  id,
  category,
  image,
  title,
  price,
  discount,
  loading,
}: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!loading) navigate(`/store/${category}/${id}`);
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

  // skeleton loading state
  if (loading) {
    return (
      <div className="card-main">
        <div className="card-img skeleton-img"></div>
        <div className="card-text">
          <p className="title skeleton-text"></p>
          <div className="prices">
            <p className="oldprice skeleton-text"></p>
            <p className="newprice skeleton-text"></p>
          </div>
          <div className="border skeleton-border"></div>
          <p className="discount skeleton-text"></p>
        </div>
      </div>
    );
  }

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
              <p className="newprice">${discountedPrice.toFixed(2)}</p>
            </>
          ) : (
            <p className="newprice">${discountedPrice.toFixed(2)}</p>
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
