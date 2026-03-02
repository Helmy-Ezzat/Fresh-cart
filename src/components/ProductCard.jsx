import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useWishlistStore } from "../stores";
import { Heart, Loader2, Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishList,
  showRemoveWishlist = false,
  onRemoveFromWishlist,
}) {
  const [isAddingWishlist, setIsAddingWishlist] = useState(false);
  
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  
  const isInWishlist = useMemo(() => {
    if (showRemoveWishlist) return true;
    
    return wishlistItems.some((item) => {
      if (item.id === product.id || item._id === product.id) return true;
      if (typeof item === 'string' && item === product.id) return true;
      return false;
    });
  }, [wishlistItems, product.id, showRemoveWishlist]);

  const handleWishlistToggle = async () => {
    setIsAddingWishlist(true);
    try {
      if (showRemoveWishlist || isInWishlist) {
        if (onRemoveFromWishlist) {
          await onRemoveFromWishlist(product.id);
        }
      } else {
        if (onAddToWishList) {
          await onAddToWishList(product.id);
        }
      }
    } finally {
      setIsAddingWishlist(false);
    }
  };

  return (
    <div className="relative overflow-hidden transition duration-200 ease-out bg-white shadow-sm border group rounded-xl sm:rounded-2xl hover:shadow-lg hover:-translate-y-1">
      <div className="flex flex-col px-2">
        <Link className="flex-1 block no-underline" to={`/productDetails/${product.id}`}>
          <div className="flex flex-col items-center h-full gap-1.5 sm:gap-2">
              <img
                src={product.imageCover}
                className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105"
                alt={product.title}
              />
            <div className="">
              <h6 className="text-sm lg:text-lg tracking-wide uppercase font-medium text-emerald-500">
                {product.category.name}
              </h6>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[2.8rem]">
                {product.title.slice(1,30)}
              </h3>
              <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                {product.priceAfterDiscount ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through leading-none">
                      {product.price} EGP
                    </span>
                    <span className="text-sm sm:text-base font-bold text-emerald-600 leading-none">
                      {product.priceAfterDiscount} EGP
                    </span>
                  </div>
                ) : (
                  <p className="text-sm sm:text-base font-bold text-emerald-600">
                    {product.price} EGP
                  </p>
                )}
                <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-50 rounded-md">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{product.ratingsAverage}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 pb-2 sm:pb-3 mt-2 sm:mt-3">
          <button
            onClick={handleWishlistToggle}
            disabled={isAddingWishlist}
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 bg-white border border-gray-200 rounded-full shadow hover:bg-rose-100 hover:scale-110 disabled:opacity-70 ${
              isInWishlist ? "bg-rose-50 border-rose-300" : ""
            }`}
          >
            {isAddingWishlist ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 animate-spin" />
            ) : (
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isInWishlist ? "fill-rose-500 text-rose-500" : "text-gray-700"
                }`}
              />
            )}
          </button>
          <AddToCartButton
            productId={product.id}
            onAddToCart={onAddToCart}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}
