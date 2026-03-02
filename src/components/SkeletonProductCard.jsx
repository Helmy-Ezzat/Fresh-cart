export default function SkeletonProductCard() {
  return (
    <div className="relative overflow-hidden transition duration-200 ease-out bg-white shadow-sm group rounded-xl sm:rounded-2xl animate-pulse">
      <div className="flex flex-col h-full px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex-1 block">
          <div className="flex flex-col items-center h-full gap-1.5 sm:gap-2">
            {/* Image Skeleton */}
            <div className="flex items-center justify-center w-full h-40 sm:h-48 overflow-hidden rounded-lg sm:rounded-xl bg-gray-100"></div>
            
            {/* Content Skeleton */}
            <div className="w-full space-y-1 sm:space-y-1.5">
              {/* Category */}
              <div className="h-3 sm:h-3.5 bg-gray-100 rounded w-1/3"></div>
              
              {/* Title - 2 lines with min-height */}
              <div className="space-y-1 min-h-[2.5rem] sm:min-h-[2.8rem]">
                <div className="h-3 sm:h-3.5 bg-gray-100 rounded w-full"></div>
                <div className="h-3 sm:h-3.5 bg-gray-100 rounded w-4/5"></div>
              </div>
              
              {/* Price & Rating */}
              <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                <div className="h-4 sm:h-5 bg-gray-100 rounded w-20 sm:w-24"></div>
                <div className="h-6 sm:h-7 bg-gray-100 rounded-md w-12 sm:w-14"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Buttons Skeleton */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 pb-2 sm:pb-3 mt-2 sm:mt-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full"></div>
          <div className="flex-1 h-8 sm:h-10 bg-gray-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
