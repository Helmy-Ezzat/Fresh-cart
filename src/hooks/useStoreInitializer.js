import { useEffect } from 'react';
import { useUserStore, useCartStore, useWishlistStore } from '../stores';

/**
 * Custom hook to initialize all stores on app mount
 * Call this once in your App component
 */
export const useStoreInitializer = () => {
  const initializeUser = useUserStore((state) => state.initialize);
  const getUserCart = useCartStore((state) => state.getUserCart);
  const getWishlist = useWishlistStore((state) => state.getWishlist);
  const userToken = useUserStore((state) => state.userToken);

  useEffect(() => {
    // Initialize user from localStorage
    initializeUser();
  }, [initializeUser]);

  useEffect(() => {
    // Load cart and wishlist when user is authenticated
    if (userToken) {
      getUserCart();
      getWishlist();
    }
  }, [userToken, getUserCart, getWishlist]);
};
