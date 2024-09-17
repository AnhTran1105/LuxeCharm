import Slider from "react-slick";
import { useEffect, useState } from "react";
import ButtonTag from "./CustomTags/ButtonTag";
import { CaretIcon } from "./SVG";
import ProductItem from "./ProductItem";

const getSlidesToShow = () => {
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  if (window.innerWidth <= 1280) return 4;
  return 5;
};

function ProductCarousel({ products }) {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: getSlidesToShow(),
    afterChange: (current) => setCurrentSlide(current),
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <>
      <ul role="list" className="px-4">
        <Slider ref={setSliderRef} {...settings} className="-mx-[6px] carousel">
          {products.map((product) => (
            <ProductItem
              key={`${product._id}-${
                product.defaultMetal && product.defaultMetal.metal
              }`}
              product={product}
            />
          ))}
        </Slider>
      </ul>
      {getSlidesToShow() < products.length && (
        <div className="text-sm text-text-secondary flex justify-center items-center gap-6 my-4">
          <ButtonTag
            disabled={currentSlide === 0}
            buttonType="icon"
            onClick={() => sliderRef?.slickPrev()}
            className={currentSlide === 0 ? "opacity-30" : ""}
          >
            <CaretIcon width={12} height={12} className="rotate-90" />
          </ButtonTag>
          <span>
            {currentSlide + 1} / {products.length - slidesToShow + 1}
          </span>
          <ButtonTag
            disabled={currentSlide + 1 === products.length - slidesToShow + 1}
            className={
              currentSlide + 1 === products.length - slidesToShow + 1
                ? "opacity-30"
                : ""
            }
            buttonType="icon"
            onClick={() => sliderRef?.slickNext()}
          >
            <CaretIcon width={12} height={12} className="-rotate-90" />
          </ButtonTag>
        </div>
      )}
    </>
  );
}

export default ProductCarousel;
