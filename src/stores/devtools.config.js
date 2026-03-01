/**
 * Zustand DevTools Configuration
 * 
 * To use Redux DevTools with Zustand:
 * 1. Install Redux DevTools Extension in browser
 * 2. Open DevTools (F12)
 * 3. Select Redux tab
 * 4. You'll find all stores (UserStore, CartStore, WishlistStore)
 * 
 * Features:
 * - Time travel debugging
 * - State inspection
 * - Action tracking
 * - State diff
 */

export const devtoolsConfig = {
  enabled: process.env.NODE_ENV === 'development',
  name: 'FreshCart Store',
  trace: true,
  traceLimit: 25,
};

/**
 * Persist Configuration
 * 
 * Data is automatically saved to localStorage
 * Key: 'user-storage'
 * 
 * To clear saved data:
 * localStorage.removeItem('user-storage')
 */
export const persistConfig = {
  name: 'user-storage',
  version: 1,
  // Can add migration for future versions
  migrate: (persistedState, version) => {
    if (version === 0) {
      // Migration logic here
    }
    return persistedState;
  },
};
