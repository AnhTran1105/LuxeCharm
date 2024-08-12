import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useState } from "react";

function ArrowPrev(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "rgba(255,255,255,1)",
        opacity: "",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
        borderRadius: "999px",
      }}
      onClick={onClick}
    >
      <svg
        className="h-4 w-4 rotate-90"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 22 13"
      >
        <polyline
          points="21.557 1.222 11 11.778 0.443 1.222"
          fill="none"
          stroke="#121212"
          strokeMiterlimit="10"
        ></polyline>
      </svg>
    </div>
  );
}

function ArrowNext(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "rgba(255,255,255,1)",
        opacity: "",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
        borderRadius: "999px",
      }}
      onClick={onClick}
    >
      <svg
        className="h-4 w-4 rotate-[-90deg]"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 22 13"
      >
        <polyline
          points="21.557 1.222 11 11.778 0.443 1.222"
          fill="none"
          stroke="#121212"
          strokeMiterlimit="10"
        ></polyline>
      </svg>
    </div>
  );
}

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
