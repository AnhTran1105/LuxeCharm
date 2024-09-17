import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../redux/cart/cartSlice";
import ButtonTag from "./CustomTags/ButtonTag";
import { openOptionsModal } from "../redux/optionsModal/optionsModalSlice";
import { useNavigate } from "react-router-dom";
import { CaretIcon } from "./SVG";

const getSlidesToShow = () => {
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  if (window.innerWidth <= 1280) return 4;
  return 5;
};

function ProductCarousel({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <ul role="list" className="px-[15px]">
        <Slider ref={setSliderRef} {...settings} className="-mx-[6px] carousel">
          {products.map((product) => (
            <li
              key={`${product._id}-${
                product.defaultMetal && product.defaultMetal.metal
              }`}
              onClick={() =>
                navigate(
                  product.defaultMetal
                    ? `/products/${product._id}?metal=${product.defaultMetal.metal}`
                    : `/products/${product._id}`
                )
              }
              className="group cursor-pointer relative carousel-item"
            >
              <div className="relative overflow-hidden">
                <img
                  loading="lazy"
                  alt={product.name}
                  src={
                    product.defaultMetal
                      ? product.defaultMetal.images.primary
                      : product.metals[0].images.primary
                  }
                  className="aspect-[4/5] hover:opacity-0 absolute top-0 left-0 w-full"
                />
                <img
                  alt={product.name}
                  src={
                    product.defaultMetal
                      ? product.defaultMetal.images.secondary
                      : product.metals[0].images.secondary
                  }
                  loading="lazy"
                  className="aspect-[4/5] opacity-0 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-[300ms] ease-linear"
                ></img>
              </div>
              {product.salePrice && (
                <div className="absolute top-3 left-3">
                  <span className="bg-background-primary w-fit px-3 py-2 rounded-full text-xs text-white">
                    {Math.ceil(
                      ((product.price - product.salePrice) / product.price) *
                        100
                    )}
                    % Off
                  </span>
                </div>
              )}
              <div className="pt-3 pb-4 text-center text-sm">
                <h3>
                  <div className="group-hover:underline underline-offset-2 single-line">
                    {product.name}
                  </div>
                </h3>
                <div>
                  {product.salePrice ? (
                    <div className="mt-2">
                      <span className="text-text-secondary line-through mr-4">
                        ${product.price}.00
                      </span>
                      <span className="mr-2">${product.salePrice}.00</span>
                    </div>
                  ) : (
                    <div className="mt-2">${product.price}.00</div>
                  )}
                </div>
              </div>
              {product.metals.length > 1 ? (
                <ButtonTag
                  onClick={() =>
                    dispatch(
                      openOptionsModal({
                        productId: product._id,
                        defaultMetal: product.defaultMetal,
                      })
                    )
                  }
                >
                  Choose options
                </ButtonTag>
              ) : (
                <ButtonTag
                  onClick={() =>
                    dispatch(
                      handleAddToCart({
                        ...product,
                        metal: product.metals[0].metal,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to cart
                </ButtonTag>
              )}
            </li>
          ))}
        </Slider>
      </ul>
      {getSlidesToShow() < products.length && (
        <div className="text-sm text-text-secondary flex justify-center items-center gap-6 mt-4">
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
