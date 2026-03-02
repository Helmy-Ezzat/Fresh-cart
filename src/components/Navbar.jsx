import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/images/freshcart-logo.svg";
import { useUserStore } from "../stores";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const userToken = useUserStore((state) => state.userToken);
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 no-underline ${
      isActive
        ? "text-emerald-600 bg-emerald-100/60 shadow-md"
        : "text-gray-700 hover:text-emerald-600 hover:bg-gray-100/60"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl border-gray-100/50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="FreshCart" className="h-6 sm:h-8" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center justify-center flex-1 hidden ml-12 md:flex">
            {userToken && (
              <div className="flex items-center gap-1 bg-gray-100/40 px-2 py-1.5 rounded-xl">
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/products" className={navLinkClass}>
                  Products
                </NavLink>
                <NavLink to="/categories" className={navLinkClass}>
                  Categories
                </NavLink>
                <NavLink to="/brands" className={navLinkClass}>
                  Brands
                </NavLink>
                <NavLink to="/orders" className={navLinkClass}>
                  Orders
                </NavLink>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="items-center hidden gap-6 md:flex">
            {/* Auth Section */}
            {userToken ? (
              <div className="flex items-center gap-3">
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold transition-all duration-300 text-emerald-600 hover:bg-emerald-100/60 rounded-xl"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg rounded-xl hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-emerald-100/60 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="w-6 h-6 transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
}
