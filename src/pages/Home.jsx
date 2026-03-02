import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HomeSlider, CategorySlider, ProductCard, SkeletonProductCard } from "../components";
import { Link } from "react-router-dom";
import { useCartStore, useWishlistStore } from "../stores";
import toast from "react-hot-toast";
import config from "../config/env";

export default function Home() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const deleteFromWishlist = useWishlistStore((state) => state.deleteProduct);

  async function productToWishList(id) {
    try {
      const res = await addToWishlist(id);
      if (res.status === "success") {
        toast.success("Added successfully to Wish List", {
          duration: 1000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function removeFromWishList(id) {
    try {
      const res = await deleteFromWishlist(id);
      if (res.status === "success") {
        toast.success("Removed from Wish List", {
          duration: 1000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function addProduct(id) {
    try {
      const res = await addProductToCart(id);
      if (res.status === "success") {
        toast.success("Added successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function getAllProducts() {
    return axios.get(`${config.apiBaseUrl}/products`);
  }

  const productsQuery = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  if (productsQuery.isLoading) {
    const skeletonItems = Array.from({ length: 10 });

    return (
      <div className="flex flex-col gap-8 sm:gap-10">
        {/* Hero Slider Skeleton */}
        <div className="animate-pulse">
          <div className="overflow-hidden bg-gray-100 rounded-2xl h-64 sm:h-80 md:h-96" />
        </div>

        {/* Category Slider Skeleton */}
        <div className="py-6 sm:py-8 animate-pulse">
          <div className="w-48 mb-4 bg-gray-100 rounded-lg h-7 sm:h-8" />
          <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Products Section Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between animate-pulse">
            <div className="w-40 sm:w-48 bg-gray-100 rounded-lg h-6 sm:h-7" />
            <div className="w-16 sm:w-20 h-4 sm:h-5 bg-gray-100 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {skeletonItems.map((_, idx) => (
              <SkeletonProductCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <HomeSlider />
      <CategorySlider />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
            Featured Products
          </h1>
          <Link
            to="/products"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 products sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {productsQuery.data.data.data.slice(0, 10).map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onAddToCart={addProduct}
              onAddToWishList={productToWishList}
              onRemoveFromWishlist={removeFromWishList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
