import { useCartStore } from "../stores";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import emptyimg from "../Assets/images/preview.png";
import { Trash2, Eraser } from "lucide-react";

export default function Cart() {
  const updateCount = useCartStore((state) => state.updateCount);
  const totalCartPrice = useCartStore((state) => state.totalCartPrice);
  const allProducts = useCartStore((state) => state.allProducts);
  const deleteProduct = useCartStore((state) => state.deleteProduct);
  const clearCart = useCartStore((state) => state.clearCart);
  const getUserCart = useCartStore((state) => state.getUserCart);
  const numOfCartItems = useCartStore((state) => state.numOfCartItems);
  
  const cartQuery = useQuery({
    queryKey: ["getUserCart"],
    queryFn: getUserCart,
  });

  if (cartQuery.isLoading) {
    return (
      <section className="max-w-6xl px-4 pt-4 pb-10 mx-auto sm:px-6 lg:px-8 sm:pt-6">
        <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center animate-pulse">
          <div>
            <div className="w-40 h-6 mb-2 bg-gray-100 rounded-full" />
            <div className="w-56 h-4 bg-gray-100 rounded-full" />
          </div>
          <div className="w-40 bg-gray-100 rounded-full h-9" />
        </div>

        <div className="flex items-center justify-between mb-3 animate-pulse">
          <div className="bg-gray-100 rounded-full h-7 w-28" />
          <div className="w-24 h-4 bg-gray-100 rounded-full" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-4 p-4 bg-white shadow-sm md:flex-row md:items-stretch rounded-2xl animate-pulse"
            >
              <div className="flex-shrink-0 w-24 sm:w-28">
                <div className="w-full h-24 bg-gray-100 sm:h-28 rounded-xl" />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="w-3/4 h-4 bg-gray-100 rounded-full" />
                <div className="w-32 h-4 bg-gray-100 rounded-full" />
                <div className="w-24 bg-gray-100 rounded-full h-7" />
              </div>

              <div className="flex items-center justify-between w-full gap-3 md:flex-col md:justify-center md:w-auto">
                <div className="w-8 h-8 bg-gray-100 rounded-full" />
                <div className="w-8 h-4 bg-gray-100 rounded-full" />
                <div className="w-8 h-8 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (cartQuery.isError || !allProducts || allProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] justify-center items-center px-4">
        <div className="space-y-3 text-center">
          <h4 className="text-xl font-semibold text-gray-800">Cart is empty</h4>
          <div className="flex justify-center">
            <img
              src={emptyimg}
              height={260}
              alt="Empty cart"
              className="object-contain w-full max-w-xs"
            />
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-5 py-2 mt-2 text-sm font-medium text-white transition rounded-full bg-emerald-500 hover:bg-emerald-600"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  async function updateMyproductCount(id, newCount) {
    const res = await updateCount(id, newCount);
    if (res) {
      toast.success("product updated successfully", {
        duration: 1500,
        position: "top-center",
      });
    } else {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  async function myDeleteProduct(id) {
    const res = await deleteProduct(id);
    if (res) {
      toast.success("product removed successfully", {
        duration: 1500,
        position: "top-center",
      });
    } else {
      toast.error("Error occurred", { duration: 1500, position: "top-center" });
    }
  }

  return (
    <>
      {numOfCartItems !== 0 ? (
        <section className="max-w-6xl px-4 pt-4 pb-10 mx-auto sm:px-6 lg:px-8 sm:pt-6">
          <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Shopping Cart
              </h2>
              <h5 className="text-sm text-main sm:text-base">
                Total cart price : {totalCartPrice} EGP
              </h5>
            </div>
            <Link to="/payment">
              <button className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white transition rounded-full bg-emerald-500 hover:bg-emerald-600">
                Confirm Payment
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-between mb-3">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-red-200 text-red-600 text-xs sm:text-sm px-4 py-1.5 hover:bg-red-50 transition"
              onClick={clearCart}
            >
              <Eraser size={16} /> clear
            </button>
            <span className="text-xs text-gray-500 sm:text-sm">
              {numOfCartItems} items in your cart
            </span>
          </div>

          <div className="space-y-3">
            {allProducts.map((product, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 p-4 transition duration-200 bg-white shadow-sm md:flex-row md:items-stretch rounded-2xl hover:shadow-md"
              >
                <div className="flex-shrink-0 w-24 sm:w-28">
                  <img
                    src={product.product.imageCover}
                    className="object-contain w-full h-24 sm:h-28 rounded-xl bg-gray-50"
                    alt={product.product.title}
                  />
                </div>

                <div className="flex-1 w-full">
                  <h3 className="text-sm font-medium text-gray-800 sm:text-base line-clamp-2">
                    {product.product.title}
                  </h3>
                  <h5 className="mt-1 text-sm text-main sm:text-base">
                    Price: {product.price} EGP
                  </h5>
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1 mt-2 text-xs text-red-600 transition border border-red-200 rounded-full sm:text-sm hover:bg-red-50"
                    onClick={() => myDeleteProduct(product.product.id)}
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>

                <div className="flex items-center justify-between w-full gap-3 md:flex-col md:justify-center md:w-auto">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 text-base transition border rounded-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                    onClick={() =>
                      updateMyproductCount(
                        product.product.id,
                        product.count + 1,
                      )
                    }
                  >
                    +
                  </button>
                  <p className="text-sm font-medium text-gray-800 min-w-[2rem] text-center">
                    {product.count}
                  </p>
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 text-base text-red-500 transition border border-red-400 rounded-full hover:bg-red-500 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-red-500"
                    disabled={product.count === 1}
                    onClick={() =>
                      updateMyproductCount(
                        product.product.id,
                        product.count - 1,
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex min-h-[60vh] justify-content-center items-center px-4">
          <div className="my-4 text-center">
            <h4 className="text-xl font-semibold text-gray-800">
              Cart is empty
            </h4>
            <img
              src={emptyimg}
              height={400}
              alt="Empty cart"
              className="object-contain w-full max-w-xs mx-auto mt-2"
            />
          </div>
        </div>
      )}
    </>
  );
}
