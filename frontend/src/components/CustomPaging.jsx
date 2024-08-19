import Slider from "react-slick";

function CustomPaging({ otherImages }) {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={otherImages[i]}
            alt={`thumb-${i}`}
            className="aspect-square"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {otherImages.map((url) => (
          <div key={url} className="!flex justify-center">
            <img src={url} className="w-[375px] aspect-[3/4]" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
