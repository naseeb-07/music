import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[#121212] animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-end gap-6 p-8 h-[30vh] min-h-[340px] bg-gradient-to-b from-[#282828] to-[#121212]">
        <div className="w-48 h-48 md:w-60 md:h-60 bg-[#333] shrink-0 shadow-2xl" />
        <div className="flex flex-col gap-4 w-full">
          <div className="h-4 w-20 bg-[#333] rounded" />
          <div className="h-16 md:h-24 w-1/2 bg-[#333] rounded" />
          <div className="h-4 w-3/4 bg-[#333] rounded" />
          <div className="h-4 w-40 bg-[#333] rounded" />
        </div>
      </div>

      {/* Track List Skeleton */}
      <div className="p-8 flex flex-col gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-2">
            <div className="w-4 h-4 bg-[#333] rounded" />
            <div className="w-10 h-10 bg-[#333] rounded shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-1/4 bg-[#333] rounded" />
              <div className="h-3 w-1/6 bg-[#333] rounded" />
            </div>
            <div className="w-1/4 h-4 bg-[#333] rounded hidden md:block" />
            <div className="w-12 h-4 bg-[#333] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
