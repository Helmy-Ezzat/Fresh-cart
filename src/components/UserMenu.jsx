import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore, useCartStore, useWishlistStore } from '../stores';
import { ShoppingCart, Heart, Receipt, LogOut } from 'lucide-react';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userData = useUserStore((state) => state.userData);
  const logout = useUserStore((state) => state.logout);
  const resetCart = useCartStore((state) => state.resetCart);
  const resetWishlist = useWishlistStore((state) => state.resetWishlist);
  const numOfCartItems = useCartStore((state) => state.numOfCartItems);
  const numOfWishlistItems = useWishlistStore((state) => state.numOfWishlistItems);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    resetCart();
    resetWishlist();
    setIsOpen(false);
    navigate('/login');
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const userInitial = userData?.name?.charAt(0).toUpperCase() || 'U';
  const totalNotifications = numOfCartItems + numOfWishlistItems;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 text-sm font-medium text-white transition-all duration-200 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userInitial}
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white shadow-lg">
            {totalNotifications > 99 ? '99+' : totalNotifications}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-64 origin-top-right">
          <div className="absolute right-3 -top-2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
          
          <div className="relative bg-white rounded-xl shadow-xl ring-1 ring-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                  {userInitial}
                </div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userData?.name || 'User'}
                </p>
              </div>
            </div>

            <div className="py-2">
              <Link
                to="/cart"
                onClick={handleMenuItemClick}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 transition-colors group no-underline"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                  <ShoppingCart size={16} />
                </div>
                <div className="flex-1">
                  <span className="font-medium">Shopping Cart</span>
                </div>
                {numOfCartItems > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-emerald-500 rounded-full">
                    {numOfCartItems}
                  </span>
                )}
              </Link>

              <Link
                to="/wishlist"
                onClick={handleMenuItemClick}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 transition-colors group no-underline"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 text-rose-600 group-hover:bg-rose-200 transition-colors">
                  <Heart size={16} />
                </div>
                <div className="flex-1">
                  <span className="font-medium">Wishlist</span>
                </div>
                {numOfWishlistItems > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-rose-500 rounded-full">
                    {numOfWishlistItems}
                  </span>
                )}
              </Link>

              <Link
                to="/orders"
                onClick={handleMenuItemClick}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors group no-underline"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                  <Receipt size={16} />
                </div>
                <div className="flex-1">
                  <span className="font-medium">My Orders</span>
                </div>
              </Link>
            </div>

            <div className="border-t border-gray-100"></div>

            <div className="py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                  <LogOut size={16} />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
