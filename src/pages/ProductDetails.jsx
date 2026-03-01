import React from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Audio } from "react-loader-spinner";
import { useCartStore } from "../stores";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AddToCartButton } from "../components";
import { Star } from "lucide-react";

export default function ProductDetails() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const { id } = useParams();

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function addProduct(productId) {
    try {
      const res = await addProductToCart(productId);
      if (res?.status === "success") {
        toast.success("added successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: [`ProductDetails-${id}`],
    queryFn: getProductDetails,
  });

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 animate-pulse">
        <div className="grid gap-6 md:grid-cols-[1.1fr,1.6fr] items-start">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
            <div className="w-full max-w-sm h-64 sm:h-80 bg-gray-100 rounded-xl" />
          </div>

          <article className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-100 rounded-full" />
            <div className="h-4 w-full bg-gray-100 rounded-full" />
            <div className="h-4 w-5/6 bg-gray-100 rounded-full" />
            <div className="h-4 w-32 bg-gray-100 rounded-full" />

            <div className="flex items-center justify-between mt-2">
              <div className="h-4 w-32 bg-gray-100 rounded-full" />
              <div className="h-4 w-20 bg-gray-100 rounded-full" />
            </div>

            <div className="mt-4 h-9 w-full rounded-full bg-gray-100" />
          </article>
        </div>
      </section>
    );
  }

  if (isError || !data?.data?.data) {
    return <Navigate to="/products" />;
  }

  const product = data.data.data;

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
      </Helmet>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr,1.6fr] items-start">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center">
            <img
              className="w-full max-w-sm object-contain rounded-xl transition-transform duration-200 hover:scale-105"
              src={product.imageCover}
              alt={product.title}
            />
          </div>

          <article className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {product.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {product.description}
            </p>
            <p className="text-sm font-medium text-emerald-600">
              {product.category.name}
            </p>

            <div className="flex items-center justify-between text-sm sm:text-base mt-2">
              {product.priceAfterDiscount ? (
                <p className="font-semibold text-gray-800">
                  <span className="line-through text-gray-400">
                    {product.price}
                  </span>{" "}
                  <span className="text-emerald-600">
                    {product.priceAfterDiscount} EGP
                  </span>
                </p>
              ) : (
                <p className="font-semibold text-emerald-600">
                  {product.price} EGP
                </p>
              )}
              <p className="font-semibold text-gray-700 flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product.ratingsAverage}</span>
              </p>
            </div>

            <AddToCartButton
              productId={product.id}
              onAddToCart={addProduct}
              variant="full"
              className="mt-4"
            />
          </article>
        </div>
      </section>
    </>
  );
}
