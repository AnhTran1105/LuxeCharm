import Slider from "react-slick";
import ArrowNext from "./ArrowNext";
import ArrowPrev from "./ArrowPrev";

function CustomPaging({ imageUrls }) {
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
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
  };
  return (
    <div className="slider-container custom-paging">
      <Slider {...settings}>
        {imageUrls.map((url) => (
          <div key={url} className="!flex justify-center">
            <img src={url} className="w-[375px] aspect-[3/4]" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
