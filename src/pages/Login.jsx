import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { useUserStore } from "../stores";
import config from "../config/env";

export default function Login() {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const [errMeg, setErrMeg] = useState();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loginSubmit(values) {
    setErrMeg(null);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${config.apiBaseUrl}/auth/signin`,
        values,
      );

      if (res.data.message === "success") {
        setUserToken(res.data.token);
        setIsSuccess(true);

          navigate("/");
      } else {
        setErrMeg("Login failed, please try again.");
      }
    } catch (error) {
      setErrMeg(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  const valdateSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string().matches(
      /^[A-Z][a-zA-Z0-9]{6,}$/,
      "Wrong password format",
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: valdateSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        {isSuccess && (
          <div className="mb-3 rounded-lg bg-emerald-500/10 text-emerald-700 text-sm px-3 py-2 text-center">
            Login Success
          </div>
        )}
        {errMeg && !isSuccess && (
          <div className="mb-3 rounded-lg bg-red-500/10 text-red-700 text-sm px-3 py-2 text-center">
            {errMeg}
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Login Now
        </h3>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              id="email"
              name="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              id="password"
              name="password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-xs text-red-600 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type={isLoading ? "button" : "submit"}
              disabled={isLoading || !(formik.isValid && formik.dirty)}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Audio
                  height="20"
                  width="80"
                  color="white"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  radius="9"
                />
              ) : (
                "Login"
              )}
            </button>

            <p className="text-xs sm:text-sm text-gray-600 text-center">
              If you don't have an account{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-600 hover:text-emerald-700 underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
