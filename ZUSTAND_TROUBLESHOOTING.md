# 🔧 Zustand Troubleshooting Guide

## مشكلة 1: Component يعيد Render كثيراً

### الأعراض
```jsx
function MyComponent() {
  const store = useCartStore(); // يعيد render عند أي تغيير
  console.log('Rendered!'); // يطبع كثيراً
  return <div>{store.count}</div>;
}
```

### الحل
```jsx
function MyComponent() {
  const count = useCartStore((state) => state.count); // فقط عند تغيير count
  console.log('Rendered!'); // يطبع عند تغيير count فقط
  return <div>{count}</div>;
}
```

---

## مشكلة 2: State لا يتحدث

### الأعراض
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => {
    this.count++; // ❌ لا يعمل
  },
}));
```

### الحل
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })), // ✅
}));
```

---

## مشكلة 3: Cannot read property of undefined

### الأعراض
```jsx
const user = useUserStore((state) => state.user);
console.log(user.name); // Error: Cannot read property 'name' of null
```

### الحل
```jsx
const user = useUserStore((state) => state.user);
console.log(user?.name); // ✅ Optional chaining

// أو
const userName = useUserStore((state) => state.user?.name);
```

---

## مشكلة 4: Persist لا يعمل

### الأعراض
```jsx
const useStore = create(
  persist((set) => ({
    user: null,
  }))
); // ❌ ناقص parameters
```

### الحل
```jsx
const useStore = create(
  persist(
    (set) => ({
      user: null,
    }),
    { name: 'user-storage' } // ✅ اسم المفتاح مطلوب
  )
);
```

---

## مشكلة 5: DevTools لا تظهر

### الأعراض
- Redux DevTools مثبت لكن لا يظهر الـ store

### الحل
```jsx
// تأكد من الترتيب الصحيح
const useStore = create(
  devtools(
    persist(
      (set) => ({ /* ... */ }),
      { name: 'storage' }
    ),
    { name: 'MyStore' } // ✅ اسم الـ store في DevTools
  )
);
```

---

## مشكلة 6: Async Action لا يعمل

### الأعراض
```jsx
const useStore = create((set) => ({
  data: null,
  fetchData: async () => {
    const data = await api.getData();
    return data; // ❌ لا يحدث الـ state
  },
}));
```

### الحل
```jsx
const useStore = create((set) => ({
  data: null,
  fetchData: async () => {
    const data = await api.getData();
    set({ data }); // ✅ استخدم set
    return data;
  },
}));
```

---

## مشكلة 7: Memory Leak

### الأعراض
```jsx
function MyComponent() {
  const fetchData = useStore((state) => state.fetchData);
  
  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    // ❌ لا يوجد cleanup
  }, [fetchData]);
}
```

### الحل
```jsx
function MyComponent() {
  const fetchData = useStore((state) => state.fetchData);
  
  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval); // ✅ cleanup
  }, [fetchData]);
}
```

---

## مشكلة 8: Store يتشارك بين Tests

### الأعراض
```jsx
test('test 1', () => {
  useStore.getState().setCount(5);
  expect(useStore.getState().count).toBe(5);
});

test('test 2', () => {
  expect(useStore.getState().count).toBe(0); // ❌ Fails: count is 5
});
```

### الحل
```jsx
beforeEach(() => {
  useStore.getState().reset(); // ✅ Reset قبل كل test
});

test('test 1', () => {
  useStore.getState().setCount(5);
  expect(useStore.getState().count).toBe(5);
});

test('test 2', () => {
  expect(useStore.getState().count).toBe(0); // ✅ Works
});
```

---

## مشكلة 9: Circular Dependency

### الأعراض
```jsx
// userStore.js
import { useCartStore } from './cartStore';

export const useUserStore = create((set) => ({
  logout: () => {
    useCartStore.getState().reset(); // ❌ Circular import
  },
}));

// cartStore.js
import { useUserStore } from './userStore';
```

### الحل
```jsx
// userStore.js
export const useUserStore = create((set) => ({
  logout: () => {
    // استخدم dynamic import
    import('./cartStore').then(({ useCartStore }) => {
      useCartStore.getState().reset();
    });
  },
}));

// أو استخدم event emitter
```

---

## مشكلة 10: TypeScript Errors

### الأعراض
```typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Error: Property 'count' does not exist
const count = useStore((state) => state.count);
```

### الحل
```typescript
interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

---

## مشكلة 11: Stale Closure

### الأعراض
```jsx
const useStore = create((set, get) => ({
  count: 0,
  increment: () => {
    setTimeout(() => {
      const count = get().count; // ❌ قد يكون قديم
      set({ count: count + 1 });
    }, 1000);
  },
}));
```

### الحل
```jsx
const useStore = create((set, get) => ({
  count: 0,
  increment: () => {
    setTimeout(() => {
      set((state) => ({ count: state.count + 1 })); // ✅ استخدم updater function
    }, 1000);
  },
}));
```

---

## مشكلة 12: Nested Object Update

### الأعراض
```jsx
const useStore = create((set) => ({
  user: { name: 'John', age: 30 },
  updateName: (name) => {
    set((state) => {
      state.user.name = name; // ❌ Mutation
      return state;
    });
  },
}));
```

### الحل
```jsx
const useStore = create((set) => ({
  user: { name: 'John', age: 30 },
  updateName: (name) => {
    set((state) => ({
      user: { ...state.user, name }, // ✅ Immutable update
    }));
  },
}));

// أو استخدم Immer
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    user: { name: 'John', age: 30 },
    updateName: (name) => {
      set((state) => {
        state.user.name = name; // ✅ Immer يسمح بهذا
      });
    },
  }))
);
```

---

## مشكلة 13: localStorage Quota Exceeded

### الأعراض
```
QuotaExceededError: Failed to execute 'setItem' on 'Storage'
```

### الحل
```jsx
const useStore = create(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'storage',
      // حدد البيانات المهمة فقط
      partialize: (state) => ({
        user: state.user,
        // لا تحفظ البيانات الكبيرة
      }),
    }
  )
);
```

---

## مشكلة 14: Action لا يعمل في useEffect

### الأعراض
```jsx
function MyComponent() {
  const fetchData = useStore((state) => state.fetchData);
  
  useEffect(() => {
    fetchData();
  }, []); // ❌ Warning: fetchData should be in dependencies
}
```

### الحل
```jsx
function MyComponent() {
  const fetchData = useStore((state) => state.fetchData);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ أضف للـ dependencies

  // أو استخدم useCallback
  const fetchData = useStore(
    useCallback((state) => state.fetchData, [])
  );
}
```

---

## مشكلة 15: Store لا يتحدث بعد API Call

### الأعراض
```jsx
const useStore = create((set) => ({
  data: null,
  fetchData: async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    set({ data });
    console.log('Data:', data); // يطبع البيانات
  },
}));

// في Component
const data = useStore((state) => state.data);
console.log('Component data:', data); // null
```

### الحل
```jsx
// تأكد من استخدام await
const fetchData = useStore((state) => state.fetchData);

useEffect(() => {
  fetchData(); // ✅ سيحدث الـ state
}, [fetchData]);

// أو تحقق من الـ response
const useStore = create((set) => ({
  data: null,
  error: null,
  fetchData: async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      set({ data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
```

---

## 🛠️ أدوات التشخيص

### 1. Redux DevTools
```jsx
// تأكد من تفعيل DevTools
const useStore = create(
  devtools((set) => ({ /* ... */ }), { name: 'MyStore' })
);
```

### 2. Console Logging
```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => {
    console.log('Before:', useStore.getState().count);
    set((state) => ({ count: state.count + 1 }));
    console.log('After:', useStore.getState().count);
  },
}));
```

### 3. Subscribe للتغييرات
```jsx
useStore.subscribe(
  (state) => console.log('State changed:', state)
);
```

---

## 📞 الحصول على المساعدة

1. تحقق من [Zustand Docs](https://docs.pmnd.rs/zustand)
2. ابحث في [GitHub Issues](https://github.com/pmndrs/zustand/issues)
3. اسأل في [Discord](https://discord.gg/poimandres)
4. راجع الأمثلة في `src/examples/`

---

## ✅ Checklist للتشخيص

- [ ] هل استخدمت selector بدلاً من الـ store كاملاً؟
- [ ] هل استخدمت `set()` لتحديث الـ state؟
- [ ] هل الـ updates immutable؟
- [ ] هل أضفت cleanup في useEffect؟
- [ ] هل الـ middleware بالترتيب الصحيح؟
- [ ] هل DevTools مفعل؟
- [ ] هل تحققت من الـ console للأخطاء؟
- [ ] هل جربت reset الـ store؟

إذا استمرت المشكلة، راجع الملفات في `src/stores/` للأمثلة الصحيحة.
