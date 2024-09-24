import Slider from "react-slick";
import { CaretIcon } from "./SVG";
import { useState } from "react";
import ButtonTag from "./CustomTags/ButtonTag";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function CustomPaging({ imageUrls }) {
  const [sliderRef, setSliderRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={imageUrls[i]}
            alt={`thumb-${i}`}
            className="aspect-square"
          />
        </a>
      );
    },
    dots: true,
    fade: true,
    dotsClass: "grid grid-cols-5 gap-2 lg:gap-3 relative px-10",
    infinite: false,
    afterChange: (current) => setCurrentSlide(current),
    appendDots: (dots) => (
      <ul>
        <ButtonTag
          disabled={currentSlide === 0}
          buttonType="icon"
          onClick={() => sliderRef?.slickPrev()}
          className={`absolute top-1/2 left-0 -translate-y-1/2 ${
            currentSlide === 0 ? "opacity-30" : ""
          }`}
        >
          <CaretIcon width={12} height={12} className="rotate-90" />
        </ButtonTag>
        {dots}
        <ButtonTag
          disabled={currentSlide + 1 === imageUrls.length}
          buttonType="icon"
          onClick={() => sliderRef?.slickNext()}
          className={`absolute top-1/2 right-0 -translate-y-1/2 ${
            currentSlide + 1 === imageUrls.length ? "opacity-30" : ""
          }`}
        >
          <CaretIcon width={12} height={12} className="-rotate-90" />
        </ButtonTag>
      </ul>
    ),
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container custom-paging">
      <Slider ref={setSliderRef} {...settings}>
        {imageUrls.map((url) => (
          <Zoom key={url}>
            <div className="!flex justify-center">
              <img src={url} className="w-full lg:w-1/2 aspect-[3/4]" />
            </div>
          </Zoom>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
