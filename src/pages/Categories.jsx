import axios from "axios";
import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

export default function Category() {
  //const [categoryList, setCategory] = useState([])
  async function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  const { isLoading, data } = useQuery({
    queryKey: ["getCategory"],
    queryFn: getCategory,
  });
  console.log(data);
  if (isLoading) {
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
          {data.data.data.map((category, idx) => {
            return (
              <>
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2 gy-1  rounded-3"
                  key={idx}
                >
                  <img src={category.image} className="w-100" height={300} />
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
