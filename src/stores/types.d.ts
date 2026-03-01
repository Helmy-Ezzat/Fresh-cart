/**
 * TypeScript Type Definitions for Zustand Stores
 * 
 * إذا قررت تحويل المشروع لـ TypeScript في المستقبل،
 * هذه الأنواع ستساعدك
 */

// User Types
export interface UserData {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface UserStore {
  userToken: string | null;
  userData: UserData | null;
  setUserToken: (token: string | null) => void;
  getUserData: () => void;
  logout: () => void;
  initialize: () => void;
}

// Cart Types
export interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface CartStore {
  numOfCartItems: number;
  totalCartPrice: number;
  allProducts: CartProduct[];
  cartID: string | null;
  isLoading: boolean;
  error: string | null;
  addProductToCart: (productId: string) => Promise<any>;
  getUserCart: () => Promise<any>;
  updateCount: (id: string, newCount: number) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  resetCart: () => void;
}

// Wishlist Types
export interface WishlistStore {
  numOfWishlistItems: number;
  wishlistItems: Product[];
  isLoading: boolean;
  error: string | null;
  addToWishlist: (productId: string) => Promise<any>;
  deleteProduct: (id: string) => Promise<any>;
  getWishlist: () => Promise<any>;
  resetWishlist: () => void;
}
