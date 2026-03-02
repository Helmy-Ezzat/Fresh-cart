import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import config from "../config/env";

export default function Category() {
  async function getCategory() {
    return axios.get(`${config.apiBaseUrl}/categories`);
  }
  const categoriesQuery = useQuery({
    queryKey: ["getCategory"],
    queryFn: getCategory,
  });
  console.log(categoriesQuery.data);
  if (categoriesQuery.isLoading) {
    return (
      <div className="container mt-2">
        <div className="row">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="col-6 col-sm-4 col-md-3 col-lg-2 gy-1 animate-pulse"
            >
              <div
                className="w-100 bg-gray-200 rounded-3"
                style={{ height: "300px" }}
              />
              <div className="h-6 w-3/4 bg-gray-200 rounded-full m-2 mx-auto" />
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
          {categoriesQuery.data.data.data.map((category, idx) => {
            return (
              <>
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2 gy-1  rounded-3"
                  key={idx}
                >
                  <img src={category.image} className="w-100" height={300} alt={category.name} />
                  <h3 className="text-main text-center fw-bold m-2">
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
