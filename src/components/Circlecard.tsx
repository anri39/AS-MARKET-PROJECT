import "./Circlecard.css";

type Circlecardprops = {
  image: string;
  name: string;
};

function Circlecard({ image, name }: Circlecardprops) {
  return (
    <div className="circleCard-main">
      <div className="imgholder">
        <img src={image} alt="" />
      </div>
      <p>{name}</p>
    </div>
  );
}

export default Circlecard;
