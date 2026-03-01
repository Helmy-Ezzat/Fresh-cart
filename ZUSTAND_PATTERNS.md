# 🎨 Zustand Common Patterns

## Pattern 1: Optimistic Updates

```jsx
const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: async (item) => {
    // Optimistic update
    set((state) => ({ items: [...state.items, item] }));
    
    try {
      await api.addItem(item);
    } catch (error) {
      // Rollback on error
      set((state) => ({
        items: state.items.filter((i) => i.id !== item.id),
      }));
      throw error;
    }
  },
}));
```

## Pattern 2: Debounced Actions

```jsx
import { debounce } from 'lodash';

const useSearchStore = create((set) => ({
  query: '',
  results: [],
  
  search: debounce(async (query) => {
    set({ query, isLoading: true });
    const results = await api.search(query);
    set({ results, isLoading: false });
  }, 300),
}));
```

## Pattern 3: Pagination

```jsx
const useProductsStore = create((set, get) => ({
  products: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  
  loadMore: async () => {
    if (get().isLoading || !get().hasMore) return;
    
    set({ isLoading: true });
    const { page } = get();
    const newProducts = await api.getProducts(page);
    
    set((state) => ({
      products: [...state.products, ...newProducts],
      page: page + 1,
      hasMore: newProducts.length > 0,
      isLoading: false,
    }));
  },
  
  reset: () => set({ products: [], page: 1, hasMore: true }),
}));
```

## Pattern 4: Undo/Redo

```jsx
const useHistoryStore = create((set, get) => ({
  past: [],
  present: null,
  future: [],
  
  setState: (newState) => {
    const { present, past } = get();
    set({
      past: [...past, present],
      present: newState,
      future: [],
    });
  },
  
  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    set({
      past: newPast,
      present: previous,
      future: [present, ...future],
    });
  },
  
  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  },
}));
```

## Pattern 5: Derived State

```jsx
const useCartStore = create((set, get) => ({
  items: [],
  
  // Computed values
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  
  get itemCount() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  get isEmpty() {
    return get().items.length === 0;
  },
}));

// Usage
function Cart() {
  const total = useCartStore((state) => state.total);
  const itemCount = useCartStore((state) => state.itemCount);
  const isEmpty = useCartStore((state) => state.isEmpty);
}
```

## Pattern 6: Async Initialization

```jsx
const useAppStore = create((set, get) => ({
  isInitialized: false,
  user: null,
  settings: null,
  
  initialize: async () => {
    if (get().isInitialized) return;
    
    try {
      const [user, settings] = await Promise.all([
        api.getUser(),
        api.getSettings(),
      ]);
      
      set({ user, settings, isInitialized: true });
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  },
}));

// في App.jsx
function App() {
  const initialize = useAppStore((state) => state.initialize);
  const isInitialized = useAppStore((state) => state.isInitialized);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  if (!isInitialized) return <Loading />;
  
  return <Routes />;
}
```

## Pattern 7: Cross-Store Communication

```jsx
// userStore.js
const useUserStore = create((set) => ({
  user: null,
  logout: () => {
    set({ user: null });
    // Notify other stores
    useCartStore.getState().reset();
    useWishlistStore.getState().reset();
  },
}));

// cartStore.js
const useCartStore = create((set) => ({
  items: [],
  reset: () => set({ items: [] }),
}));
```

## Pattern 8: Conditional Actions

```jsx
const useAuthStore = create((set, get) => ({
  user: null,
  
  updateProfile: async (data) => {
    const { user } = get();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const updated = await api.updateProfile(user.id, data);
    set({ user: updated });
  },
}));
```

## Pattern 9: Batch Updates

```jsx
const useStore = create((set) => ({
  name: '',
  email: '',
  age: 0,
  
  updateUser: (userData) => {
    // Single update instead of multiple
    set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
    });
  },
}));
```

## Pattern 10: Middleware Chain

```jsx
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        // store logic
      })),
      { name: 'my-storage' }
    ),
    { name: 'MyStore' }
  )
);

// Subscribe to specific changes
useStore.subscribe(
  (state) => state.user,
  (user) => console.log('User changed:', user)
);
```

## Pattern 11: Error Boundaries

```jsx
const useStore = create((set) => ({
  data: null,
  error: null,
  
  fetchData: async () => {
    try {
      const data = await api.getData();
      set({ data, error: null });
    } catch (error) {
      set({ error: error.message });
      // Log to error tracking service
      errorTracker.log(error);
    }
  },
  
  clearError: () => set({ error: null }),
}));
```

## Pattern 12: Polling

```jsx
const useRealtimeStore = create((set, get) => ({
  data: null,
  intervalId: null,
  
  startPolling: () => {
    const intervalId = setInterval(async () => {
      const data = await api.getData();
      set({ data });
    }, 5000);
    
    set({ intervalId });
  },
  
  stopPolling: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
      set({ intervalId: null });
    }
  },
}));

// في Component
useEffect(() => {
  startPolling();
  return () => stopPolling();
}, []);
```

## Pattern 13: Local Storage Sync

```jsx
const useStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ar',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-settings',
      // Custom storage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
```

## Pattern 14: Validation

```jsx
const useFormStore = create((set, get) => ({
  email: '',
  password: '',
  errors: {},
  
  setEmail: (email) => {
    const errors = { ...get().errors };
    
    if (!email.includes('@')) {
      errors.email = 'Invalid email';
    } else {
      delete errors.email;
    }
    
    set({ email, errors });
  },
  
  isValid: () => {
    const { errors } = get();
    return Object.keys(errors).length === 0;
  },
}));
```

## Pattern 15: Request Cancellation

```jsx
const useSearchStore = create((set, get) => ({
  results: [],
  abortController: null,
  
  search: async (query) => {
    // Cancel previous request
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    
    const newController = new AbortController();
    set({ abortController: newController });
    
    try {
      const results = await api.search(query, {
        signal: newController.signal,
      });
      set({ results });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search failed:', error);
      }
    }
  },
}));
```

## 🎯 الخلاصة

هذه الأنماط تغطي معظم الحالات الشائعة:
- Optimistic updates للـ UX أفضل
- Debouncing للأداء
- Pagination للبيانات الكبيرة
- Undo/Redo للتحرير
- Derived state للقيم المحسوبة
- Async initialization للتهيئة
- Cross-store communication للتنسيق
- Error handling للموثوقية
- Polling للبيانات الحية
- Validation للنماذج

استخدم هذه الأنماط حسب احتياجات مشروعك.
