import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../stores";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { AddToCartButton } from "../components";
import { Star, Package, ShieldCheck } from "lucide-react";
import config from "../config/env";

export default function ProductDetails() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const { id } = useParams();

  function getProductDetails() {
    return axios.get(`${config.apiBaseUrl}/products/${id}`);
  }

  async function addProduct(productId) {
    try {
      const res = await addProductToCart(productId);
      if (res?.status === "success") {
        toast.success("Added successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  const productDetailsQuery = useQuery({
    queryKey: [`ProductDetails-${id}`],
    queryFn: getProductDetails,
  });

  if (productDetailsQuery.isLoading) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 animate-pulse">
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2 items-start">
          {/* Image Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 flex items-center justify-center sticky top-24">
            <div className="w-full aspect-square bg-gray-100 rounded-xl" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-gray-100 rounded-lg" />
              <div className="h-4 w-32 bg-gray-100 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded-full" />
              <div className="h-4 w-full bg-gray-100 rounded-full" />
              <div className="h-4 w-5/6 bg-gray-100 rounded-full" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-32 bg-gray-100 rounded-lg" />
              <div className="h-6 w-20 bg-gray-100 rounded-full" />
            </div>
            <div className="h-12 w-full rounded-xl bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  if (productDetailsQuery.isError || !productDetailsQuery.data?.data?.data) {
    return <Navigate to="/products" />;
  }

  const product = productDetailsQuery.data.data.data;
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.title} | FreshCart</title>
      </Helmet>

      <section className="max-w-6xl mx-auto  sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10">
        <div className="grid gap-3 lg:gap-10 md:grid-cols-2 items-start">
          {/* Product Image */}
          <div className="relative overflow-hidden group">
            <img
              className="w-full max-w-md object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
              src={product.imageCover}
              alt={product.title}
            />
            {hasDiscount && (
              <div className="absolute top-6 right-3 sm:right-12 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <article className="space-y-4 sm:space-y-6">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-medium">
              <Package size={14} />
              {product.category.name}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm sm:text-base font-semibold text-gray-800">
                  {product.ratingsAverage}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">
                ({product.ratingsQuantity || 0} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
              {hasDiscount ? (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      {product.price} EGP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    You save {product.price - product.priceAfterDiscount} EGP
                  </p>
                </div>
              ) : (
                <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
                  {product.price} EGP
                </span>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <AddToCartButton
              productId={product.id}
              onAddToCart={addProduct}
              variant="full"
              className="w-full"
            />

            {/* Additional Info */}
            {product.brand && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500">
                  Brand: <span className="font-medium text-gray-700">{product.brand.name}</span>
                </p>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
