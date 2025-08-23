import Slider from "react-slick";
import Card from "../components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/similiarProducts.css";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  discount?: string;
  [key: string]: any;
};

interface Props {
  products: Product[];
}

const SimilarProducts: React.FC<Props> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 360, settings: { slidesToShow: 1 } },
    ],
  };

  if (products.length === 0) return null;

  return (
    <div className="similar-products-wrapper">
      <h2>Similar Products</h2>
      <Slider {...settings}>
        {products.map((p) => (
          <div key={p.id}>
            <Card
              id={p.id}
              category={p.category}
              image={p.imageUrl}
              title={p.name}
              price={p.price}
              discount={p.discount}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProducts;
