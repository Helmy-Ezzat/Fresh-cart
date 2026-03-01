import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import config from '../config/env';

const API_BASE = config.apiBaseUrl;

const useWishlistStore = create(
  devtools(
    (set, get) => ({
      // State
      numOfWishlistItems: 0,
      wishlistItems: [],
      isLoading: false,
      error: null,

      // Actions
      addToWishlist: async (productId) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(
            `${API_BASE}/wishlist`,
            { productId },
            { headers: { token: localStorage.getItem('userToken') } }
          );
          
          if (data.status === 'success') {
            // API returns array of IDs only, need to fetch full wishlist
            await get().getWishlist();
          }
          
          return data;
        } catch (error) {
          set({ error: error.message });
          console.error('Add to wishlist error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.delete(`${API_BASE}/wishlist/${id}`, {
            headers: { token: localStorage.getItem('userToken') }
          });
          
          if (data.status === 'success') {
            // API returns array of IDs only, need to fetch full wishlist
            await get().getWishlist();
          }
          
          return data;
        } catch (error) {
          set({ error: error.message });
          console.error('Delete from wishlist error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getWishlist: async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
          set({ wishlistItems: [], numOfWishlistItems: 0 });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.get(`${API_BASE}/wishlist`, {
            headers: { token }
          });
          
          if (data.status === 'success') {
            set({
              numOfWishlistItems: data.count || 0,
              wishlistItems: data.data || [],
            });
          }
          
          return data;
        } catch (error) {
          set({ error: error.message });
          console.error('Get wishlist error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Reset wishlist on logout
      resetWishlist: () => {
        set({
          numOfWishlistItems: 0,
          wishlistItems: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    { name: 'WishlistStore' }
  )
);

export default useWishlistStore;
