import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    cssEase: "linear",
  };

  const slides = [
    {
      id: 1,
      image: require("../../Assets/images/slider-image-1.jpeg"),
      title: "Fresh Groceries Delivered",
      subtitle: "Get your daily essentials at your doorstep",
    },
    {
      id: 2,
      image: require("../../Assets/images/slider-image-2.jpeg"),
      title: "Organic & Fresh",
      subtitle: "100% organic products for healthy living",
    },
    {
      id: 3,
      image: require("../../Assets/images/slider-image-3.jpeg"),
      title: "Best Prices Guaranteed",
      subtitle: "Save more on every purchase",
    },
  ];

  return (
    <div className="relative w-full h-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg opacity-90">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
