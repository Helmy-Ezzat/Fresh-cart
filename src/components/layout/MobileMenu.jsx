import { NavLink } from 'react-router-dom';

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  userToken, 
  numOfCartItems, 
  numOfWishlistItems, 
  onLogout 
}) {
  if (!isOpen) return null;

  const mobileNavLinkClass = ({ isActive }) =>
    `block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="border-t md:hidden bg-white/80 backdrop-blur-xl border-gray-100/50 animate-in fade-in slide-in-from-top-2">
      <div className="px-4 py-4 mx-auto space-y-2 max-w-7xl">
        {userToken && (
          <>
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-home" />
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-bag-shopping" />
              Products
            </NavLink>
            <NavLink
              to="/categories"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-th" />
              Categories
            </NavLink>
            <NavLink
              to="/brands"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-bookmark" />
              Brands
            </NavLink>
            <NavLink
              to="/orders"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-receipt" />
              Orders
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-regular fa-heart" />
              Wishlist
              {numOfWishlistItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 ml-auto text-xs font-bold text-white rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
                  {numOfWishlistItems}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              onClick={onClose}
              className={mobileNavLinkClass}
            >
              <i className="mr-3 fa-solid fa-shopping-cart" />
              Cart
              {numOfCartItems > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 ml-auto text-xs font-bold text-white rounded-full bg-emerald-500">
                  {numOfCartItems}
                </span>
              )}
            </NavLink>
          </>
        )}

        <div className="pt-4 mt-4 border-t border-gray-100/50">
          <div className="flex items-center justify-center gap-3 mb-4">
            <a
              href="#"
              className="p-2.5 rounded-lg bg-gray-100/60 text-emerald-600 hover:bg-emerald-100/60 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg bg-gray-100/60 text-emerald-600 hover:bg-emerald-100/60 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg bg-gray-100/60 text-emerald-600 hover:bg-emerald-100/60 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-lg bg-gray-100/60 text-emerald-600 hover:bg-emerald-100/60 transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>

          {userToken ? (
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:shadow-lg"
            >
              <i className="mr-2 fa-solid fa-sign-out-alt" />
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                to="/login"
                onClick={onClose}
                className="w-full px-4 py-3 text-sm font-semibold text-center transition-all duration-300 text-emerald-600 bg-emerald-100/60 rounded-xl hover:bg-emerald-200/60"
              >
                <i className="mr-2 fa-solid fa-sign-in-alt" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={onClose}
                className="w-full px-4 py-3 text-sm font-semibold text-center text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg"
              >
                <i className="mr-2 fa-solid fa-user-plus" />
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
