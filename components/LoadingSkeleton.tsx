import React, { useState } from 'react';
interface LoadingSkeletonProps {
  viewMode: "grid" | "list"
};
const ShimmerCard = ({ isListView = false }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${isListView ? 'w-full' : ''}`}>  
      {/* Title */}
      <div className="mb-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 shimmer"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 shimmer"></div>
      </div>
      
      {/* Metadata row */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 shimmer"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-8 shimmer"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 shimmer"></div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/5 shimmer"></div>
      </div>
      
      {/* Tags and Sectors */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-8 shimmer"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-16 shimmer"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-20 shimmer"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 shimmer"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-24 shimmer"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-28 shimmer"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom section with formats and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 shimmer"></div>
          <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
        </div>
      </div>
      
      {/* Published by */}
      <div className="flex justify-end mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 shimmer"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = ({ viewMode }: LoadingSkeletonProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <ShimmerCard />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <ShimmerCard isListView={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingSkeleton;