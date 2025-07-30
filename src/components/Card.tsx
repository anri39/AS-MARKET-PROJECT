import "./Card.css";

type cardProps = {
  image: string;
  title: string;
  price: number;
  discount?: string;
};

function Card({ image, title, price, discount }: cardProps) {
  return (
    <div className="card-main">
      <div className="card-img">
        <img src={image} alt="" />
        <p className="imgdisc">{discount} OFF</p>
      </div>
      <div className="card-text">
        <p className="title">{title}</p>
        <p className="price">${price}</p>
        {discount && <p className="discount">Save {discount}</p>}
      </div>
    </div>
  );
}

export default Card;
