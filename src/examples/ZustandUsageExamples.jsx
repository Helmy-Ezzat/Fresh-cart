/**
 * أمثلة عملية لاستخدام Zustand Stores
 * هذا الملف للتوضيح فقط - ليس للاستخدام المباشر
 */

import { useUserStore, useCartStore, useWishlistStore } from '../stores';
import { 
  selectUserToken, 
  selectCartCount, 
  selectCartSummary 
} from '../stores/selectors';

// ============================================
// مثال 1: استخدام User Store في Login
// ============================================
function LoginExample() {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const isAuthenticated = useUserStore(selectUserToken);

  const handleLogin = async (email, password) => {
    try {
      // استدعاء API
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const { token } = await response.json();
      
      // حفظ الـ token
      setUserToken(token);
      
      // الـ store سيقوم تلقائياً بـ:
      // 1. فك تشفير الـ JWT
      // 2. حفظ البيانات في localStorage
      // 3. تحديث userData
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <div>{isAuthenticated ? 'Logged In' : 'Please Login'}</div>;
}

// ============================================
// مثال 2: استخدام Cart Store
// ============================================
function CartExample() {
  // استخدام selector واحد
  const cartCount = useCartStore(selectCartCount);
  
  // استخدام عدة selectors
  const { items, total, isLoading } = useCartStore(selectCartSummary);
  
  // استخدام actions
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const deleteProduct = useCartStore((state) => state.deleteProduct);
  const updateCount = useCartStore((state) => state.updateCount);

  const handleAddToCart = async (productId) => {
    try {
      await addProductToCart(productId);
      // الـ store سيقوم تلقائياً بتحديث السلة
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, newCount) => {
    const success = await updateCount(productId, newCount);
    if (success) {
      console.log('Quantity updated');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Cart ({cartCount} items)</h2>
      <p>Total: ${total}</p>
      {items.map((item) => (
        <div key={item._id}>
          <span>{item.product.title}</span>
          <button onClick={() => handleUpdateQuantity(item._id, item.count + 1)}>
            +
          </button>
          <button onClick={() => deleteProduct(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

// ============================================
// مثال 3: استخدام Wishlist Store
// ============================================
function WishlistExample() {
  const wishlistCount = useWishlistStore((state) => state.numOfWishlistItems);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const deleteProduct = useWishlistStore((state) => state.deleteProduct);
  const isLoading = useWishlistStore((state) => state.isLoading);

  const handleToggleWishlist = async (productId, isInWishlist) => {
    try {
      if (isInWishlist) {
        await deleteProduct(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  return (
    <div>
      <h2>Wishlist ({wishlistCount} items)</h2>
      {isLoading && <p>Loading...</p>}
      {wishlistItems.map((item) => (
        <div key={item._id}>
          <span>{item.title}</span>
          <button onClick={() => handleToggleWishlist(item._id, true)}>
            Remove from Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}

// ============================================
// مثال 4: استخدام متعدد للـ Stores
// ============================================
function NavbarExample() {
  // User Store
  const userData = useUserStore((state) => state.userData);
  const logout = useUserStore((state) => state.logout);
  
  // Cart Store
  const cartCount = useCartStore(selectCartCount);
  const resetCart = useCartStore((state) => state.resetCart);
  
  // Wishlist Store
  const wishlistCount = useWishlistStore((state) => state.numOfWishlistItems);
  const resetWishlist = useWishlistStore((state) => state.resetWishlist);

  const handleLogout = () => {
    logout();
    resetCart();
    resetWishlist();
    // Navigate to login page
  };

  return (
    <nav>
      <div>Welcome, {userData?.name}</div>
      <div>Cart: {cartCount}</div>
      <div>Wishlist: {wishlistCount}</div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

// ============================================
// مثال 5: Protected Route
// ============================================
function ProtectedRouteExample({ children }) {
  const userToken = useUserStore(selectUserToken);

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return children;
}

// ============================================
// مثال 6: استخدام useEffect مع Stores
// ============================================
function ProductDetailsExample({ productId }) {
  const getUserCart = useCartStore((state) => state.getUserCart);
  const getWishlist = useWishlistStore((state) => state.getWishlist);
  const userToken = useUserStore(selectUserToken);

  useEffect(() => {
    if (userToken) {
      // تحميل البيانات عند دخول الصفحة
      getUserCart();
      getWishlist();
    }
  }, [userToken, getUserCart, getWishlist]);

  return <div>Product Details</div>;
}

// ============================================
// مثال 7: استخدام مع React Query
// ============================================
function ProductsWithReactQueryExample() {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleQuickAdd = async (productId) => {
    try {
      await addProductToCart(productId);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div>
      {products?.map((product) => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <button onClick={() => handleQuickAdd(product._id)}>
            Add to Cart
          </button>
          <button onClick={() => addToWishlist(product._id)}>
            Add to Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}

export {
  LoginExample,
  CartExample,
  WishlistExample,
  NavbarExample,
  ProtectedRouteExample,
  ProductDetailsExample,
  ProductsWithReactQueryExample,
};
