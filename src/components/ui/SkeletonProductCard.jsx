export default function SkeletonProductCard() {
  return (
    <div className="relative overflow-hidden transition duration-200 ease-out bg-white shadow-sm group rounded-xl sm:rounded-2xl animate-pulse">
      <div className="flex flex-col h-full px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex-1 block">
          <div className="flex flex-col items-center h-full gap-1.5 sm:gap-2">
            <div className="flex items-center justify-center w-full h-48 overflow-hidden rounded-lg sm:rounded-xl bg-gray-200"></div>
            <div className="w-full">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="flex items-center justify-between mt-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2 pb-2 sm:pb-3 mt-2 sm:mt-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-8 sm:h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
