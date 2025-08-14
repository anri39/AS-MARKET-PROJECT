import { useNavigate } from "react-router-dom";
import "./Card.css";

type cardProps = {
  id: string;
  category: string;
  image: string;
  title: string;
  price: number;
  discount?: string;
};

function Card({ id, category, image, title, price, discount }: cardProps) {
  // redirection logic
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/store/${category}/${id}`);
  };

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
    <div
      className="card-main"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
