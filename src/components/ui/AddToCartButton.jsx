import { useState, useMemo } from "react";
import { useCartStore } from "../../stores";
import { Loader2, CheckCircle2, ShoppingCart } from "lucide-react";

export default function AddToCartButton({
  productId,
  onAddToCart,
  variant = "default",
  className = "",
}) {
  const [isAdding, setIsAdding] = useState(false);
  const cartProducts = useCartStore((state) => state.allProducts);

  const isInCart = useMemo(() => {
    return cartProducts.some((item) => item.product.id === productId);
  }, [cartProducts, productId]);

  const handleClick = async () => {
    if (isInCart) return;

    setIsAdding(true);
    try {
      await onAddToCart(productId);
    } finally {
      setIsAdding(false);
    }
  };

  const variants = {
    default: {
      button: `flex items-center justify-center flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-all duration-300 rounded-full shadow-md disabled:opacity-70 ${
        isInCart
          ? "bg-emerald-700 hover:bg-emerald-800 cursor-not-allowed"
          : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:scale-105 disabled:bg-emerald-400"
      }`,
      icon: "w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2",
      text: {
        adding: (
          <>
            <span className="hidden xs:inline">Adding...</span>
            <span className="xs:hidden">...</span>
          </>
        ),
        inCart: (
          <>
            <span className="hidden sm:inline">In Cart</span>
            <span className="sm:hidden">Added</span>
          </>
        ),
        add: (
          <>
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Add</span>
          </>
        ),
      },
    },
    full: {
      button: `w-full inline-flex items-center justify-center rounded-full text-white text-sm sm:text-base font-medium px-5 py-2.5 transition-all duration-300 shadow-md ${
        isInCart
          ? "bg-emerald-700 hover:bg-emerald-800 cursor-not-allowed"
          : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg"
      }`,
      icon: "w-4 h-4 sm:w-5 sm:h-5 mr-2",
      text: {
        adding: "Adding to Cart...",
        inCart: "Added to Cart ✓",
        add: "Add to Cart",
      },
    },
  };

  const currentVariant = variants[variant];

  return (
    <button
      onClick={handleClick}
      disabled={isAdding || isInCart}
      className={`${currentVariant.button} ${className}`}
    >
      {isAdding ? (
        <>
          <Loader2 className={`${currentVariant.icon} animate-spin`} />
          {currentVariant.text.adding}
        </>
      ) : isInCart ? (
        <>
          <CheckCircle2 className={`${currentVariant.icon} animate-bounce`} />
          {currentVariant.text.inCart}
        </>
      ) : (
        <>
          <ShoppingCart className={currentVariant.icon} />
          {currentVariant.text.add}
        </>
      )}
    </button>
  );
}
