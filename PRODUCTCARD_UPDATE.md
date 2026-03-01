# 🎨 ProductCard Update - Smart State Detection

## المشكلة

المستخدم كان يقدر يضيف نفس المنتج للسلة أو المفضلة أكثر من مرة لأن الـ ProductCard مكانش بيتحقق من الـ stores.

## الحل

تم تحديث `ProductCard.jsx` ليتحقق تلقائياً من:
1. ✅ هل المنتج موجود في السلة؟
2. ✅ هل المنتج موجود في المفضلة؟

---

## التحديثات

### 1. استيراد Stores

```jsx
import { useCartStore, useWishlistStore } from "../../stores";
```

### 2. التحقق من السلة

```jsx
const cartProducts = useCartStore((state) => state.allProducts);

const isInCart = useMemo(() => {
  return cartProducts.some((item) => item.product.id === product.id);
}, [cartProducts, product.id]);
```

### 3. التحقق من المفضلة

```jsx
const wishlistItems = useWishlistStore((state) => state.wishlistItems);

const isInWishlist = useMemo(() => {
  if (showRemoveWishlist) return true;
  return wishlistItems.some((item) => item.id === product.id || item._id === product.id);
}, [wishlistItems, product.id, showRemoveWishlist]);
```

### 4. منع الإضافة المكررة

```jsx
const handleAddToCart = async () => {
  if (isInCart) return; // لو موجود بالفعل، متضيفوش تاني
  
  setIsAddingCart(true);
  try {
    await onAddToCart(product.id);
  } finally {
    setIsAddingCart(false);
  }
};
```

---

## المميزات الجديدة

### 1. Visual Feedback

#### السلة
- ❌ **قبل**: زر "Add to Cart" عادي
- ✅ **بعد**: 
  - لو المنتج مش في السلة: "Add to Cart" (أخضر)
  - لو المنتج في السلة: "In Cart" ✓ (أخضر غامق)

#### المفضلة
- ❌ **قبل**: قلب فاضي دائماً
- ✅ **بعد**:
  - لو المنتج مش في المفضلة: قلب فاضي (رمادي)
  - لو المنتج في المفضلة: قلب ممتلئ (أحمر)

### 2. Performance Optimization

استخدام `useMemo` لتجنب re-calculations غير ضرورية:

```jsx
const isInCart = useMemo(() => {
  return cartProducts.some((item) => item.product.id === product.id);
}, [cartProducts, product.id]);
```

### 3. Smart State Management

الـ state يتحدث تلقائياً عند:
- إضافة منتج للسلة
- حذف منتج من السلة
- إضافة منتج للمفضلة
- حذف منتج من المفضلة

---

## كيف يعمل؟

### Flow للسلة

```
1. User يضغط "Add to Cart"
   ↓
2. ProductCard يتحقق: isInCart?
   ↓
3. لو false → يضيف المنتج
   ↓
4. CartStore يتحدث
   ↓
5. ProductCard يعيد render
   ↓
6. isInCart = true
   ↓
7. الزر يتغير لـ "In Cart" ✓
```

### Flow للمفضلة

```
1. User يضغط القلب
   ↓
2. ProductCard يتحقق: isInWishlist?
   ↓
3. لو false → يضيف للمفضلة
   لو true → يحذف من المفضلة
   ↓
4. WishlistStore يتحدث
   ↓
5. ProductCard يعيد render
   ↓
6. القلب يتغير (فاضي ↔ ممتلئ)
```

---

## الأمثلة

### مثال 1: منتج جديد

```jsx
// المنتج مش في السلة ولا المفضلة
<ProductCard product={product} />

// النتيجة:
// - زر "Add to Cart" (أخضر)
// - قلب فاضي (رمادي)
```

### مثال 2: منتج في السلة

```jsx
// المنتج موجود في السلة
<ProductCard product={product} />

// النتيجة:
// - زر "In Cart" ✓ (أخضر غامق، disabled)
// - قلب فاضي (رمادي)
```

### مثال 3: منتج في المفضلة

```jsx
// المنتج موجود في المفضلة
<ProductCard product={product} />

// النتيجة:
// - زر "Add to Cart" (أخضر)
// - قلب ممتلئ (أحمر)
```

### مثال 4: منتج في السلة والمفضلة

```jsx
// المنتج موجود في الاثنين
<ProductCard product={product} />

// النتيجة:
// - زر "In Cart" ✓ (أخضر غامق، disabled)
// - قلب ممتلئ (أحمر)
```

---

## الفوائد

### 1. User Experience
- ✅ المستخدم يعرف إذا المنتج موجود في السلة أو المفضلة
- ✅ منع الإضافة المكررة
- ✅ Visual feedback واضح

### 2. Performance
- ✅ استخدام `useMemo` للتحسين
- ✅ Re-render فقط عند التغيير
- ✅ Zustand selectors محسّنة

### 3. Code Quality
- ✅ Single source of truth (الـ stores)
- ✅ No duplicate state
- ✅ Reactive updates

---

## Testing

### اختبر الآن:

1. **إضافة للسلة**
   - اضغط "Add to Cart"
   - الزر يتغير لـ "In Cart" ✓
   - جرب تضغط تاني → مش هيضيف

2. **إضافة للمفضلة**
   - اضغط القلب
   - القلب يمتلئ ويتحول لأحمر
   - اضغط تاني → يحذف من المفضلة

3. **Refresh الصفحة**
   - الـ state يتحفظ
   - المنتجات في السلة والمفضلة تظهر صح

4. **Navigate بين الصفحات**
   - Home → Products → Home
   - الـ state يفضل صحيح

---

## الملفات المتأثرة

- ✅ `src/Components/Shared/ProductCard.jsx` - تم التحديث
- ✅ `src/Components/Home.jsx` - يستخدم ProductCard
- ✅ `src/Components/Products.jsx` - يستخدم ProductCard
- ✅ `src/Components/WishList.jsx` - يستخدم ProductCard

---

## Notes

### لماذا `useMemo`؟

```jsx
// بدون useMemo - يحسب في كل render
const isInCart = cartProducts.some((item) => item.product.id === product.id);

// مع useMemo - يحسب فقط عند تغيير cartProducts أو product.id
const isInCart = useMemo(() => {
  return cartProducts.some((item) => item.product.id === product.id);
}, [cartProducts, product.id]);
```

### لماذا `item.id === product.id || item._id === product.id`؟

لأن الـ API أحياناً يرجع `id` وأحياناً `_id`، فنتحقق من الاثنين.

---

## 🎉 النتيجة

الآن المستخدم:
- ✅ يعرف إذا المنتج في السلة
- ✅ يعرف إذا المنتج في المفضلة
- ✅ مش هيضيف نفس المنتج مرتين
- ✅ Visual feedback واضح وسريع

**تم التحديث بنجاح!** 🚀
