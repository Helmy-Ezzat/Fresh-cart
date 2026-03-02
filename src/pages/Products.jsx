import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCartStore, useWishlistStore } from "../stores";
import { ProductCard, SkeletonProductCard } from "../components";
import config from "../config/env";

export default function Products() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const deleteFromWishlist = useWishlistStore((state) => state.deleteProduct);
  const [searchQuery, setSearchQuery] = useState("");

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
    return (
      <section className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 sm:pt-6">
        <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center animate-pulse">
          <div className="space-y-2">
            <div className="w-40 h-7 bg-gray-100 rounded-lg" />
            <div className="w-64 h-4 bg-gray-100 rounded-full" />
          </div>
          <div className="w-full sm:w-72">
            <div className="w-full bg-gray-100 rounded-full h-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          {Array.from({ length: 15 }).map((_, idx) => (
            <SkeletonProductCard key={idx} />
          ))}
        </div>
      </section>
    );
  }

  const filteredProducts = productsQuery.data.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <section className="">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              All Products
            </h1>
            <p className="text-sm text-gray-500">
              Browse our wide selection of products and find the perfect fit for
              you.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <input
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 products sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onAddToCart={addProduct}
              onAddToWishList={productToWishList}
              onRemoveFromWishlist={removeFromWishList}
            />
          ))}
        </div>
      </section>
    </>
  );
}
