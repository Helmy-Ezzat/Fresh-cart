# ⚡ Quick Start - Zustand في 5 دقائق

## 🎯 الأساسيات

### 1. استيراد الـ Store
```jsx
import { useUserStore, useCartStore, useWishlistStore } from './stores';
```

### 2. استخدام في Component
```jsx
function MyComponent() {
  // احصل على قيمة واحدة
  const cartCount = useCartStore((state) => state.numOfCartItems);
  
  // احصل على action
  const addToCart = useCartStore((state) => state.addProductToCart);
  
  // استخدم
  const handleClick = () => {
    addToCart('product-id-123');
  };
  
  return <div>Cart: {cartCount}</div>;
}
```

## 📋 أمثلة سريعة

### Login/Logout
```jsx
import { useUserStore } from './stores';

function LoginButton() {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const logout = useUserStore((state) => state.logout);
  const isLoggedIn = useUserStore((state) => !!state.userToken);
  
  return (
    <button onClick={isLoggedIn ? logout : () => setUserToken('token')}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}
```

### إضافة للسلة
```jsx
import { useCartStore } from './stores';
import toast from 'react-hot-toast';

function AddToCartButton({ productId }) {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const isLoading = useCartStore((state) => state.isLoading);
  
  const handleAdd = async () => {
    try {
      await addProductToCart(productId);
      toast.success('تم الإضافة للسلة');
    } catch (error) {
      toast.error('فشلت العملية');
    }
  };
  
  return (
    <button onClick={handleAdd} disabled={isLoading}>
      {isLoading ? 'جاري الإضافة...' : 'أضف للسلة'}
    </button>
  );
}
```

### عرض السلة
```jsx
import { useCartStore } from './stores';

function CartSummary() {
  const { allProducts, totalCartPrice, numOfCartItems } = useCartStore(
    (state) => ({
      allProducts: state.allProducts,
      totalCartPrice: state.totalCartPrice,
      numOfCartItems: state.numOfCartItems,
    })
  );
  
  return (
    <div>
      <h2>السلة ({numOfCartItems})</h2>
      <p>الإجمالي: {totalCartPrice} جنيه</p>
      {allProducts.map((item) => (
        <div key={item._id}>{item.product.title}</div>
      ))}
    </div>
  );
}
```

### Protected Route
```jsx
import { useUserStore } from './stores';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const userToken = useUserStore((state) => state.userToken);
  
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

## 🔥 نصائح للأداء

### ❌ سيء (يعيد render كثيراً)
```jsx
function BadExample() {
  const store = useCartStore(); // يستهلك الـ store كاملاً
  return <div>{store.numOfCartItems}</div>;
}
```

### ✅ جيد (يعيد render فقط عند التغيير)
```jsx
function GoodExample() {
  const cartCount = useCartStore((state) => state.numOfCartItems);
  return <div>{cartCount}</div>;
}
```

## 🛠️ DevTools

1. ثبت Redux DevTools Extension
2. افتح DevTools (F12)
3. اختر تبويب Redux
4. شاهد جميع التغييرات في الـ stores

## 📱 الملفات المهمة

- `src/stores/userStore.js` - المستخدم
- `src/stores/cartStore.js` - السلة
- `src/stores/wishlistStore.js` - المفضلة
- `src/stores/selectors.js` - Selectors جاهزة
- `src/hooks/useStoreInitializer.js` - التهيئة

## 🚀 الخطوة التالية

ابدأ بتحديث المكونات واحداً تلو الآخر:
1. Login.jsx
2. Navbar.jsx
3. Cart.jsx
4. WishList.jsx
5. ProductDetails.jsx

راجع `ZUSTAND_MIGRATION.md` للتفاصيل الكاملة.
