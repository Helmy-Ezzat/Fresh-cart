import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import emptyimg from "../Assets/images/preview.png";
import config from "../config/env";

export default function Orders() {
  async function getUserOrder() {
    const userID = localStorage.getItem("userID");
    return axios.get(
      `${config.apiBaseUrl}/orders/user/${userID}`,
    );
  }

  const ordersQuery = useQuery({
    queryKey: ["getUserOrder"],
    queryFn: getUserOrder,
  });

  const orders = ordersQuery.data?.data || [];

  if (ordersQuery.isLoading) {
    return (
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-10">
        <div className="w-40 mb-6 bg-gray-100 rounded-full h-7 animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-5 animate-pulse"
            >
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full sm:w-[46%] md:w-full lg:w-[46%]">
                  <div className="w-full aspect-[4/3] rounded-xl bg-gray-100 mb-2" />
                  <div className="w-24 h-3 mb-1 bg-gray-100 rounded-full" />
                  <div className="w-32 h-3 bg-gray-100 rounded-full" />
                </div>
                <div className="w-full sm:w-[46%] md:w-full lg:w-[46%] hidden sm:block">
                  <div className="w-full aspect-[4/3] rounded-xl bg-gray-100 mb-2" />
                  <div className="w-24 h-3 mb-1 bg-gray-100 rounded-full" />
                  <div className="w-32 h-3 bg-gray-100 rounded-full" />
                </div>
              </div>
              <div className="pt-3 space-y-2 border-t border-gray-100">
                <div className="w-32 h-3 bg-gray-100 rounded-full" />
                <div className="w-40 h-3 bg-gray-100 rounded-full" />
                <div className="w-full h-3 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
            No Orders Yet
          </h1>
          <p className="max-w-md mx-auto text-sm text-gray-500 sm:text-base">
            Looks like you haven't placed any orders yet. Start shopping and
            your orders will appear here for easy tracking and management.
          </p>
          <div className="flex justify-center">
            <img
              src={emptyimg}
              alt="No orders"
              className="object-contain w-full max-w-xs sm:max-w-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 sm:text-2xl sm:mb-6">
          All Orders
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 p-4 transition duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl sm:p-5 hover:shadow-md hover:border-emerald-100"
            >
              <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                {order.cartItems.map((item, secIdx) => (
                  <div
                    key={secIdx}
                    className="w-full sm:w-[46%] md:w-full lg:w-[46%]"
                  >
                    <div className="flex flex-col h-full gap-2">
                      <img
                        src={item.product.imageCover}
                        className="w-full rounded-xl object-cover aspect-[4/3]"
                        alt={item.product.title}
                      />
                      <h6 className="text-sm text-main line-clamp-2 sm:text-base">
                        {item.product.title}
                      </h6>
                      <div className="flex items-center justify-between text-sm text-gray-700 sm:text-base">
                        <span>Price: {item.price}</span>
                        <span>Count: {item.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-1 text-sm text-gray-800 border-t border-gray-100 sm:text-base text-start">
                <h5 className="font-semibold">
                  Payment:&nbsp;
                  <span className="font-normal capitalize">
                    {order.paymentMethodType}
                  </span>
                </h5>
                <h5 className="font-semibold">
                  Order Price:&nbsp;
                  <span className="font-normal">
                    {order.totalOrderPrice} EGP
                  </span>
                </h5>
                <p className="leading-relaxed text-gray-600">
                  يتم توصيل هذا الطلب إلى{" "}
                  <span className="font-semibold">
                    {order.shippingAddress.city}
                  </span>{" "}
                  على رقم الهاتف{" "}
                  <span className="font-semibold">
                    {order.shippingAddress.phone}
                  </span>{" "}
                  مع تفاصيل العنوان:{" "}
                  <span className="font-semibold">
                    {order.shippingAddress.details}
                  </span>
                  .
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
