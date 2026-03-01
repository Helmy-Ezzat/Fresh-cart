import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HomeSlider, CategorySlider, ProductCard, SkeletonProductCard } from "../components";
import { Link } from "react-router-dom";
import { useCartStore, useWishlistStore } from "../stores";
import toast from "react-hot-toast";

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
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isLoading, data } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    const skeletonItems = Array.from({ length: 10 });

    return (
      <>
        <section className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px">
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[3fr,1.4fr] items-stretch animate-pulse">
            <div className="overflow-hidden bg-gray-100 rounded-2xl h-44 sm:h-56" />
            <div className="grid gap-3">
              <div className="w-full h-32 bg-gray-100 sm:h-36 md:h-40 rounded-2xl" />
              <div className="w-full h-32 bg-gray-100 sm:h-36 md:h-40 rounded-2xl" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl px-4 mx-auto mt-8 sm:px-6 lg:px-8 animate-pulse">
          <div className="w-40 mb-3 bg-gray-100 rounded-full h-7" />
          <div className="w-32 h-5 bg-gray-100 rounded-full" />
        </section>

        <section className="max-w-6xl px-4 mx-auto mt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
            {skeletonItems.map((_, idx) => (
              <SkeletonProductCard key={idx} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 sm:pt-6">
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[3fr,1.4fr] items-stretch">
          <div className="overflow-hidden bg-white shadow-sm rounded-2xl">
            <HomeSlider />
          </div>
          <div className="grid gap-3">
            <img
              className="object-cover w-full h-32 shadow-sm sm:h-36 md:h-40 rounded-2xl"
              src={require("../Assets/images/blog-img-1.jpeg")}
              alt="Promo 1"
            />
            <img
              className="object-cover w-full h-32 shadow-sm sm:h-36 md:h-40 rounded-2xl"
              src={require("../Assets/images/blog-img-2.jpeg")}
              alt="Promo 2"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <CategorySlider />
      </section>

      <section className="max-w-6xl px-4 mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 products sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5">
          {data.data.data.slice(0, 10).map((product, idx) => (
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
