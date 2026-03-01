/**
 * Reusable selectors for better performance
 * Use these to avoid re-renders when store updates
 */

// User Selectors
export const selectUserToken = (state) => state.userToken;
export const selectUserData = (state) => state.userData;
export const selectIsAuthenticated = (state) => !!state.userToken;

// Cart Selectors
export const selectCartItems = (state) => state.allProducts;
export const selectCartCount = (state) => state.numOfCartItems;
export const selectCartTotal = (state) => state.totalCartPrice;
export const selectCartLoading = (state) => state.isLoading;
export const selectCartError = (state) => state.error;

// Wishlist Selectors
export const selectWishlistItems = (state) => state.wishlistItems;
export const selectWishlistCount = (state) => state.numOfWishlistItems;
export const selectWishlistLoading = (state) => state.isLoading;

// Combined Selectors
export const selectCartSummary = (state) => ({
  items: state.allProducts,
  count: state.numOfCartItems,
  total: state.totalCartPrice,
  isLoading: state.isLoading,
});
