"use client"

import { motion } from "framer-motion"

interface LoadingSkeletonProps {
  viewMode: "grid" | "list"
}

function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="mb-4">
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-1 shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 shimmer"></div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mr-2 shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 shimmer"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mr-2 shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 shimmer"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mr-2 shimmer"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 shimmer"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-16 shimmer"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-20 shimmer"></div>
        </div>
        <div className="flex space-x-1">
          <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
        </div>
      </div>
    </motion.div>
  )
}

function SkeletonListItem() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 w-3/4 shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-1 shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-4 w-5/6 shimmer"></div>

          <div className="flex gap-4 mb-4">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 shimmer"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20 shimmer"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-28 shimmer"></div>
          </div>

          <div className="flex gap-2">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-16 shimmer"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-20 shimmer"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-18 shimmer"></div>
          </div>
        </div>

        <div className="w-48 flex flex-col items-end space-y-3">
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 shimmer"></div>
          <div className="flex space-x-1">
            <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
            <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
            <div className="h-6 w-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FilterSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-16 shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-12 shimmer"></div>
      </div>

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border-b border-gray-200 pb-4 mb-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-24 mb-3 shimmer"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-32 shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default function LoadingSkeleton({ viewMode }: LoadingSkeletonProps) {
  return (
    <div className="flex gap-6">
      {/* Desktop Filter Skeleton */}
      <div className="hidden md:block w-80 flex-shrink-0">
        <FilterSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1">
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {Array.from({ length: 9 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {viewMode === "grid" ? <SkeletonCard /> : <SkeletonListItem />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
