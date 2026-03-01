import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import config from '../config/env';

const API_BASE = config.apiBaseUrl;

const useCartStore = create(
  devtools(
    (set, get) => ({
      // State
      numOfCartItems: 0,
      totalCartPrice: 0,
      allProducts: [],
      cartID: null,
      isLoading: false,
      error: null,

      // Actions
      addProductToCart: async (productId) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.post(
            `${API_BASE}/cart`,
            { productId },
            { headers: { token: localStorage.getItem('userToken') } }
          );
          await get().getUserCart();
          return data;
        } catch (error) {
          set({ error: error.message });
          console.error('Add to cart error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getUserCart: async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
          set({ 
            allProducts: [], 
            numOfCartItems: 0, 
            totalCartPrice: 0,
            cartID: null 
          });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.get(`${API_BASE}/cart`, {
            headers: { token }
          });
          
          set({
            allProducts: data.data.products,
            numOfCartItems: data.numOfCartItems,
            totalCartPrice: data.data.totalCartPrice,
            cartID: data.data._id,
          });
          
          localStorage.setItem('userID', data.data.cartOwner);
          return data;
        } catch (error) {
          if (error.response?.status === 404) {
            set({ 
              allProducts: [], 
              numOfCartItems: 0, 
              totalCartPrice: 0,
              cartID: null 
            });
          } else {
            set({ error: error.message });
            console.error('Get cart error:', error);
          }
        } finally {
          set({ isLoading: false });
        }
      },

      updateCount: async (id, newCount) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.put(
            `${API_BASE}/cart/${id}`,
            { count: newCount },
            { headers: { token: localStorage.getItem('userToken') } }
          );
          
          set({
            allProducts: data.data.products,
            numOfCartItems: data.numOfCartItems,
            totalCartPrice: data.data.totalCartPrice,
          });
          
          return true;
        } catch (error) {
          set({ error: error.message });
          console.error('Update count error:', error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await axios.delete(`${API_BASE}/cart/${id}`, {
            headers: { token: localStorage.getItem('userToken') }
          });
          
          set({
            allProducts: data.data.products,
            numOfCartItems: data.numOfCartItems,
            totalCartPrice: data.data.totalCartPrice,
          });
          
          return true;
        } catch (error) {
          set({ error: error.message });
          console.error('Delete product error:', error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.delete(`${API_BASE}/cart`, {
            headers: { token: localStorage.getItem('userToken') }
          });
          
          set({
            allProducts: [],
            numOfCartItems: 0,
            totalCartPrice: 0,
          });
          
          return true;
        } catch (error) {
          set({ error: error.message });
          console.error('Clear cart error:', error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      // Reset cart on logout
      resetCart: () => {
        set({
          numOfCartItems: 0,
          totalCartPrice: 0,
          allProducts: [],
          cartID: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    { name: 'CartStore' }
  )
);

export default useCartStore;
