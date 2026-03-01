import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  async function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  const { isLoading, data } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="container mt-2">
        <div className="row">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="col-6 col-sm-4 col-md-3 col-lg-2 gy-3 animate-pulse"
            >
              <div
                className="bg-gray-200 w-100 rounded-3"
                style={{ height: "300px" }}
              />
              <div className="w-3/4 h-6 m-2 mx-auto bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          {data.data.data.map((category, idx) => {
            return (
              <>
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2 gy-3 rounded-3"
                  key={idx}
                >
                  <img src={category.image} className="w-100" height={300} />
                  <h3 className="m-2 text-center text-main fw-bold">
                    {category.name}
                  </h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
