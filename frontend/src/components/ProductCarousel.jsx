import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ArrowPrev from "./ArrowPrev";
import ArrowNext from "./ArrowNext";

function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-3 my-4">
      <ul role="list" className="px-[15px]">
        <Slider {...settings} className="-mx-[6px] carousel">
          <ProductCard />
          <ProductCard />
          <ProductCard isOptional={true} />
          <ProductCard isOff={true} />
          <ProductCard isOptional={true} />
          <ProductCard />
          <ProductCard />
          <ProductCard isOptional={true} />
          <ProductCard isOff={true} />
          <ProductCard isOptional={true} />
        </Slider>
      </ul>
      <div className="text-center text-sm text-foreground75">
        <span>
          {Math.ceil(currentSlide / 4) + 1}/
          {Math.ceil(totalSlides / settings.slidesToScroll)}
        </span>
      </div>
    </div>
  );
}

export default ProductCarousel;
