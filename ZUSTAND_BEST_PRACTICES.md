# 🎯 Zustand Best Practices

## 1. ✅ استخدم Selectors

### ❌ سيء
```jsx
function BadComponent() {
  const store = useCartStore(); // يستهلك كل الـ store
  return <div>{store.numOfCartItems}</div>;
}
```

### ✅ جيد
```jsx
function GoodComponent() {
  const numOfCartItems = useCartStore((state) => state.numOfCartItems);
  return <div>{numOfCartItems}</div>;
}
```

### ✅ أفضل (مع selector مخصص)
```jsx
import { selectCartCount } from '../stores/selectors';

function BestComponent() {
  const numOfCartItems = useCartStore(selectCartCount);
  return <div>{numOfCartItems}</div>;
}
```

## 2. ✅ افصل Actions عن State

### ❌ سيء
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

### ✅ جيد
```jsx
const useStore = create((set, get) => ({
  // State
  count: 0,
  
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

## 3. ✅ استخدم Middleware

### DevTools
```jsx
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // store logic
    }),
    { name: 'MyStore' }
  )
);
```

### Persist
```jsx
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // store logic
    }),
    { name: 'my-storage' }
  )
);
```

### Combined
```jsx
const useStore = create(
  devtools(
    persist(
      (set) => ({
        // store logic
      }),
      { name: 'my-storage' }
    ),
    { name: 'MyStore' }
  )
);
```

## 4. ✅ Handle Loading & Errors

```jsx
const useStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getData();
      set({ data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
```

## 5. ✅ استخدم get() للوصول للـ State الحالي

### ❌ سيء
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  incrementBy: (amount) => {
    // لا يمكن الوصول للـ count هنا
  },
}));
```

### ✅ جيد
```jsx
const useStore = create((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  incrementBy: (amount) => {
    const currentCount = get().count;
    set({ count: currentCount + amount });
  },
}));
```

## 6. ✅ اجعل Actions Pure Functions

### ❌ سيء
```jsx
const useStore = create((set) => ({
  user: null,
  login: (token) => {
    localStorage.setItem('token', token); // Side effect
    const decoded = jwtDecode(token); // Side effect
    set({ user: decoded });
  },
}));
```

### ✅ جيد
```jsx
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }), // Pure
}));

// في الـ component
function LoginComponent() {
  const setUser = useStore((state) => state.setUser);
  
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };
}
```

## 7. ✅ استخدم Computed Values

```jsx
const useStore = create((set, get) => ({
  items: [],
  
  // Computed value
  get totalPrice() {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  },
  
  // أو كـ function
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  },
}));
```

## 8. ✅ Reset Store بشكل صحيح

```jsx
const initialState = {
  user: null,
  cart: [],
  wishlist: [],
};

const useStore = create((set) => ({
  ...initialState,
  
  reset: () => set(initialState),
  
  // أو reset جزئي
  resetCart: () => set({ cart: [] }),
}));
```

## 9. ✅ استخدم TypeScript (اختياري)

```typescript
interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

## 10. ✅ اختبر الـ Stores

```jsx
import { renderHook, act } from '@testing-library/react';
import useStore from './store';

test('should increment count', () => {
  const { result } = renderHook(() => useStore());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## 11. ✅ استخدم Slices للـ Stores الكبيرة

```jsx
// userSlice.js
export const createUserSlice = (set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// cartSlice.js
export const createCartSlice = (set, get) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
});

// store.js
import { create } from 'zustand';
import { createUserSlice } from './userSlice';
import { createCartSlice } from './cartSlice';

const useStore = create((set, get) => ({
  ...createUserSlice(set, get),
  ...createCartSlice(set, get),
}));
```

## 12. ✅ استخدم Subscribe للـ Side Effects

```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Subscribe to changes
useStore.subscribe(
  (state) => state.count,
  (count) => {
    console.log('Count changed to:', count);
  }
);
```

## 13. ✅ Avoid Nested Objects

### ❌ سيء
```jsx
const useStore = create((set) => ({
  user: {
    profile: {
      name: 'John',
      age: 30,
    },
  },
  updateName: (name) => set((state) => ({
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        name,
      },
    },
  })),
}));
```

### ✅ جيد
```jsx
const useStore = create((set) => ({
  userName: 'John',
  userAge: 30,
  updateName: (name) => set({ userName: name }),
}));
```

## 14. ✅ استخدم Immer للـ Nested Updates (إذا لزم الأمر)

```jsx
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    user: {
      profile: {
        name: 'John',
      },
    },
    updateName: (name) => set((state) => {
      state.user.profile.name = name; // Immer يسمح بهذا
    }),
  }))
);
```

## 15. ✅ Documentation

```jsx
/**
 * User Store
 * 
 * Manages user authentication and profile data
 * 
 * @example
 * const user = useUserStore((state) => state.user);
 * const login = useUserStore((state) => state.login);
 */
const useUserStore = create((set) => ({
  // State
  user: null,
  
  /**
   * Login user with token
   * @param {string} token - JWT token
   */
  login: (token) => {
    // implementation
  },
}));
```

## 🎯 الخلاصة

1. استخدم selectors دائماً
2. افصل state عن actions
3. استخدم middleware (devtools, persist)
4. Handle loading & errors
5. اجعل actions pure
6. استخدم TypeScript إذا أمكن
7. اختبر الـ stores
8. وثق الكود

راجع الملفات في `src/stores/` لرؤية هذه الممارسات مطبقة.
