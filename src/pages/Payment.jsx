import axios from "axios";
import { useCartStore } from "../stores";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import config from "../config/env";
import { CreditCard, Banknote, MapPin, Phone, FileText, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

export default function Payment() {
  const cartID = useCartStore((state) => state.cartID);
  const totalCartPrice = useCartStore((state) => state.totalCartPrice);
  const numOfCartItems = useCartStore((state) => state.numOfCartItems);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be at least 2 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Please enter a valid Egyptian phone number"),
    details: Yup.string()
      .required("Address details are required")
      .min(10, "Please provide more detailed address"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    validationSchema,
    onSubmit: () => {
      // Will be handled by mutations
    },
  });

  // Online Payment Mutation
  const onlinePaymentMutation = useMutation({
    mutationFn: async (shippingData) => {
      const response = await axios.post(
        `${config.apiBaseUrl}/allorders/checkout-session/${cartID}`,
        shippingData,
        {
          headers: { token: localStorage.getItem("userToken") },
          params: {
            url: `${window.location.origin}`
          }
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  });

  // Cash Payment Mutation
  const cashPaymentMutation = useMutation({
    mutationFn: async (shippingData) => {
      const response = await axios.post(
        `${config.apiBaseUrl}/orders/${cartID}`,
        shippingData,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Order placed successfully!", {
          duration: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  });

  const handlePayment = async (typePayment) => {
    const errors = await formik.validateForm();
    formik.setTouched({ city: true, phone: true, details: true });
    if (Object.keys(errors).length > 0) return;

    const shippingObject = {
      shippingAddress: {
        details: formik.values.details,
        phone: formik.values.phone,
        city: formik.values.city,
      },
    };

    const paymentMethods = {
      cash: cashPaymentMutation,
      online: onlinePaymentMutation,
    };

    paymentMethods[typePayment].mutate(shippingObject);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid gap-6 lg:gap-8 md:grid-cols-[1.5fr,1fr]">
        {/* Shipping Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Shipping Details
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Please provide your delivery information
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* City Input */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="inline w-4 h-4 mr-1" />
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your city"
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${formik.touched.city && formik.errors.city
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200 focus:ring-emerald-500"
                  }`}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {formik.errors.city}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="01234567890"
                maxLength="11"
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all ${formik.touched.phone && formik.errors.phone
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200 focus:ring-emerald-500"
                  }`}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Details Textarea */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FileText className="inline w-4 h-4 mr-1" />
                Address Details
              </label>
              <textarea
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Street name, building number, floor, apartment..."
                rows="4"
                className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${formik.touched.details && formik.errors.details
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-200 focus:ring-emerald-500"
                  }`}
              />
              {formik.touched.details && formik.errors.details && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">
                  {formik.errors.details}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary & Payment Buttons */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Items</span>
                <span className="font-semibold text-gray-900">
                  {numOfCartItems} items
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {totalCartPrice} EGP
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-600">
                    {totalCartPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Choose Payment Method
            </h3>

            {/* Online Payment Button */}
            <button
              type="button"
              onClick={() => { handlePayment('online') }}
              disabled={onlinePaymentMutation.isPending || cashPaymentMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {onlinePaymentMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay Online
                </>
              )}
            </button>

            {/* Cash Payment Button */}
            <button
              type="button"
              onClick={() => { handlePayment('cash') }}
              disabled={cashPaymentMutation.isPending || onlinePaymentMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-emerald-600 bg-emerald-50 border-2 border-emerald-200 rounded-xl hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cashPaymentMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Banknote className="w-5 h-5" />
                  Cash on Delivery
                </>
              )}
            </button>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl">
            <div className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5">
              🔒
            </div>
            <p className="text-xs sm:text-sm text-blue-800">
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
