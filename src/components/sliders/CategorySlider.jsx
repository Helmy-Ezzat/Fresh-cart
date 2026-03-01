import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategories,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="py-6 sm:py-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
          Shop Popular Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center animate-pulse">
              <div className="w-full aspect-square rounded-2xl bg-gray-200 mb-3" />
              <div className="w-3/4 h-4 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-6">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {data?.data?.data.map((category) => (
          <div key={category._id} className="px-2">
            <div className="transition-transform duration-300 cursor-pointer hover:scale-105">
              <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full aspect-square"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-center text-gray-800 sm:text-base line-clamp-1">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
