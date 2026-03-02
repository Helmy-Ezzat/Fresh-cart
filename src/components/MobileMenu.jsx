import { NavLink } from 'react-router-dom';
import { useUserStore, useCartStore, useWishlistStore } from '../stores';
import { Home, ShoppingBag, Grid, Bookmark, Receipt, Heart, ShoppingCart, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  const userToken = useUserStore((state) => state.userToken);
  const logout = useUserStore((state) => state.logout);
  const numOfCartItems = useCartStore((state) => state.numOfCartItems);
  const numOfWishlistItems = useWishlistStore((state) => state.numOfWishlistItems);

  if (!isOpen) return null;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 rounded-xl no-underline ${isActive
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
      : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div data-modal="mobile-menu" className="min-h-screen">
      <div className="flex flex-col gap-2 px-4">
        {userToken && (
          <div className='flex flex-col gap-3 py-4'>
            <NavLink to="/" end onClick={onClose} className={mobileNavLinkClass}>
              <Home className="mr-3" size={18} />
              Home
            </NavLink>
            <NavLink to="/products" onClick={onClose} className={mobileNavLinkClass}>
              <ShoppingBag className="mr-3" size={18} />
              Products
            </NavLink>
            <NavLink to="/categories" onClick={onClose} className={mobileNavLinkClass}>
              <Grid className="mr-3" size={18} />
              Categories
            </NavLink>
            <NavLink to="/brands" onClick={onClose} className={mobileNavLinkClass}>
              <Bookmark className="mr-3" size={18} />
              Brands
            </NavLink>
            <NavLink to="/orders" onClick={onClose} className={mobileNavLinkClass}>
              <Receipt className="mr-3" size={18} />
              Orders
            </NavLink>
            <NavLink to="/wishlist" onClick={onClose} className={mobileNavLinkClass}>
              <Heart className="mr-3" size={18} />
              Wishlist
              {numOfWishlistItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 ml-auto text-xs font-bold text-white rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
                  {numOfWishlistItems}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" onClick={onClose} className={mobileNavLinkClass}>
              <ShoppingCart className="mr-3" size={18} />
              Cart
              {numOfCartItems > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 ml-auto text-xs font-bold text-white rounded-full bg-emerald-500">
                  {numOfCartItems}
                </span>
              )}
            </NavLink>
          </div>
        )}

        {userToken ? (
          <button onClick={() => {
            onClose();
            logout();
          }} className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <NavLink to="/login" onClick={onClose} className="w-full px-4 py-3 text-sm font-semibold text-center transition-all duration-300 text-emerald-600 bg-emerald-100/60 rounded-xl hover:bg-emerald-200/60 no-underline flex items-center justify-center">
              <LogIn className="mr-2" size={18} />
              Login
            </NavLink>
            <NavLink to="/register" onClick={onClose} className="w-full px-4 py-3 text-sm font-semibold text-center text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg no-underline flex items-center justify-center">
              <UserPlus className="mr-2" size={18} />
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
