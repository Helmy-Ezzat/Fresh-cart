import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

export default function Register() {
  const [errMeg, setErrMeg] = useState();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setErrMeg(null);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );

      if (res.data.message === 'success') {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 900);
      } else {
        setErrMeg('Registration failed, please try again.');
      }
    } catch (error) {
      setErrMeg(error?.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const valdateSchema = Yup.object({
    name: Yup.string()
      .min(3, 'name minlength is 3')
      .max(10, 'name maxlength is 10')
      .required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'phone is invalid')
      .min(11)
      .max(11)
      .required('phone is required'),
    password: Yup.string().matches(
      /^[A-Z][a-zA-Z0-9]{6,}$/,
      'password is invalid'
    ),
    rePassword: Yup.string().oneOf(
      [Yup.ref('password')],
      "repassword & password don't match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: valdateSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        {isSuccess && (
          <div className="mb-3 rounded-lg bg-emerald-500/10 text-emerald-700 text-sm px-3 py-2 text-center">
            Congratulations, your account has been created
          </div>
        )}
        {errMeg && !isSuccess && (
          <div className="mb-3 rounded-lg bg-red-500/10 text-red-700 text-sm px-3 py-2 text-center">
            {errMeg}
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Register Now
        </h3>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              id="name"
              name="name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.name}</p>
            )}
          </div>

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
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
              id="phone"
              name="phone"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-xs text-red-600 mt-1">{formik.errors.phone}</p>
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

          <div className="space-y-1">
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              id="rePassword"
              name="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-xs text-red-600 mt-1">
                {formik.errors.rePassword}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type={isLoading ? 'button' : 'submit'}
              disabled={isLoading || !(formik.isValid && formik.dirty)}
              className="w-full inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}