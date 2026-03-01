/**
 * Utility functions for Zustand stores
 */

/**
 * Create a selector that returns multiple values
 * Prevents unnecessary re-renders
 */
export const createSelector = (keys) => (state) => {
  return keys.reduce((acc, key) => {
    acc[key] = state[key];
    return acc;
  }, {});
};

/**
 * Shallow compare for objects
 * Use with zustand/shallow for better performance
 */
export const shallowEqual = (objA, objB) => {
  if (Object.is(objA, objB)) return true;
  
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
};

/**
 * Get auth headers for API calls
 */
export const getAuthHeaders = () => ({
  token: localStorage.getItem('userToken'),
});

/**
 * Handle API errors consistently
 */
export const handleApiError = (error, set) => {
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  set({ error: errorMessage, isLoading: false });
  console.error('API Error:', error);
  return errorMessage;
};

/**
 * Reset all stores (useful for logout)
 */
export const resetAllStores = () => {
  const { useUserStore, useCartStore, useWishlistStore } = require('./index');
  
  useUserStore.getState().logout();
  useCartStore.getState().resetCart();
  useWishlistStore.getState().resetWishlist();
};

/**
 * Debug helper - log store state
 */
export const logStoreState = (storeName, store) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 ${storeName} State`);
    console.log(store.getState());
    console.groupEnd();
  }
};
