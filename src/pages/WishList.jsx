import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCartStore, useWishlistStore } from "../stores";
import toast from "react-hot-toast";
import emptyimg from "../Assets/images/preview.png";
import { ProductCard, SkeletonProductCard } from "../components";
import config from "../config/env";

export default function WishList() {
  const queryClient = useQueryClient();
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const deleteProduct = useWishlistStore((state) => state.deleteProduct);
  const getWishlist = useWishlistStore((state) => state.getWishlist);

  async function getWishList() {
    try {
      return await axios.get(
        `${config.apiBaseUrl}/wishlist`,
        { headers: { token: localStorage.getItem("userToken") } },
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function addProduct(id) {
    try {
      const data = await addProductToCart(id);
      if (data?.status === "success") {
        toast.success("added successfully", {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  const wishlistQuery = useQuery({
    queryKey: ["getWishList"],
    queryFn: getWishList,
  });

    useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  if (wishlistQuery.isLoading) {
    return (
      <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 sm:pt-6">
        <span className="w-40 h-8 mb-6 text-2xl font-semibold text-gray-800 bg-gray-200 rounded-full animate-pulse" />
        <div className="grid grid-cols-2 gap-4 products sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          {Array.from({ length: 10 }).map((_, idx) => (
            <SkeletonProductCard key={idx} />
          ))}
        </div>
      </div>
    );
  }
  if (!wishlistQuery.data?.data.count) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <div className="my-4 text-center">
            <h4>Whish List is Empty</h4>
            <img src={emptyimg} height={400} alt="" />
          </div>
        </div>
      </>
    );
  }

  async function deleteMyProduct(id) {
    try {
      const res = await deleteProduct(id);
      if (res) {
        toast.success("product removed successfully", {
          duration: 1500,
          position: "top-center",
        });
        await getWishlist();
        queryClient.invalidateQueries({ queryKey: ["getWishList"] });
      }
    } catch (error) {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  return (
    <>
      <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 sm:pt-6">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          My Wish List
        </h1>
        <div className="grid grid-cols-2 gap-4 products sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          {wishlistQuery.data?.data.data.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onAddToCart={addProduct}
              showRemoveWishlist={true}
              onRemoveFromWishlist={deleteMyProduct}
            />
          ))}
        </div>
      </div>
    </>
  );
}
