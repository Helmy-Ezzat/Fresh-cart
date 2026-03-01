import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useUserStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        userToken: null,
        userData: null,

        // Actions
        setUserToken: (token) => {
          if (token) {
            localStorage.setItem('userToken', token);
            const decoded = jwtDecode(token);
            set({ userToken: token, userData: decoded });
          } else {
            localStorage.removeItem('userToken');
            set({ userToken: null, userData: null });
          }
        },

        getUserData: () => {
          const token = localStorage.getItem('userToken');
          if (token) {
            try {
              const decoded = jwtDecode(token);
              set({ userData: decoded, userToken: token });
            } catch (error) {
              console.error('Invalid token:', error);
              get().logout();
            }
          }
        },

        logout: () => {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userID');
          set({ userToken: null, userData: null });
        },

        // Initialize from localStorage
        initialize: () => {
          const token = localStorage.getItem('userToken');
          if (token) {
            try {
              const decoded = jwtDecode(token);
              set({ userToken: token, userData: decoded });
            } catch (error) {
              console.error('Invalid token on init:', error);
              get().logout();
            }
          }
        },
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({ 
          userToken: state.userToken,
          userData: state.userData 
        }),
      }
    ),
    { name: 'UserStore' }
  )
);

export default useUserStore;
