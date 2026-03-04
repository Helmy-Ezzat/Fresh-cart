import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import emptyimg from "../Assets/images/preview.png";
import config from "../config/env";
import { Package, MapPin, Phone, CreditCard, Calendar, CheckCircle } from "lucide-react";
import { useUserStore } from "../stores";

export default function Orders() {
  const userData = useUserStore((state) => state.userData);

  async function getUserOrder() {
    if (!userData?.id) return { data: [] };
    return axios.get(`${config.apiBaseUrl}/orders/user/${userData.id}`);
  }

  const ordersQuery = useQuery({
    queryKey: ["getUserOrder", userData?.id],
    queryFn: getUserOrder,
    enabled: !!userData?.id,
  });

  const orders = ordersQuery.data?.data || [];

  if (ordersQuery.isLoading) {
    return (
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-10">
        <div className="w-48 h-8 mb-6 bg-gray-100 rounded-lg animate-pulse" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl animate-pulse"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="w-32 h-5 bg-gray-100 rounded-lg" />
                <div className="w-24 h-6 bg-gray-100 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-full aspect-square bg-gray-100 rounded-xl" />
                    <div className="w-3/4 h-3 bg-gray-100 rounded-full" />
                    <div className="w-1/2 h-3 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-gray-100 rounded-full" />
                <div className="w-2/3 h-3 bg-gray-100 rounded-full" />
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
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-6 bg-gray-50 rounded-full">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              No Orders Yet
            </h1>
            <p className="max-w-md mx-auto text-sm text-gray-600 sm:text-base">
              Start shopping and your orders will appear here for easy tracking
            </p>
          </div>
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
    <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Orders
        </h2>
        <div className="px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="overflow-hidden transition duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md hover:border-emerald-100"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-3 p-4 bg-gray-50 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="text-sm font-semibold text-gray-900">
                    #{order.id || idx + 1}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {order.isPaid ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Paid
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    Pending
                  </div>
                )}

                {order.isDelivered ? (
                  <div className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                    Delivered
                  </div>
                ) : (
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                    Processing
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                {order.cartItems.map((item, secIdx) => (
                  <div
                    key={secIdx}
                    className="group"
                  >
                    <div className="relative overflow-hidden bg-gray-50 rounded-xl mb-2">
                      <img
                        src={item.product.imageCover}
                        className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={item.product.title}
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-gray-900/70 rounded-full backdrop-blur-sm">
                        x{item.count}
                      </div>
                    </div>
                    <h6 className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-1 leading-tight">
                      {item.product.title}
                    </h6>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-600">
                      {item.price} EGP
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="pt-5 space-y-3 border-t border-gray-100">
                <div className="flex items-start gap-2 text-sm">
                  <CreditCard className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="ml-1 font-semibold text-gray-900 capitalize">
                      {order.paymentMethodType}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex gap-1">
                    <span className="text-gray-600">Delivery Address:</span>
                    <p className="text-gray-900  font-semibold">
                      {order.shippingAddress.details} {order.shippingAddress.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-1 font-semibold text-gray-900">
                      {order.shippingAddress.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="text-base font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-emerald-600">
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
