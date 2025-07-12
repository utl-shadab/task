"use client"

import { useState } from "react"
import { Calendar, Download, MapPin, BarChart3, Building2 } from "lucide-react"
import type { Dataset } from "@/types"

interface DatasetListItemProps {
  dataset: Dataset
}

export default function DatasetListItem({ dataset }: DatasetListItemProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getGeography = () => {
    const geoMetadata = dataset.metadata?.find((item) => item.metadata_item.label === "Geography")
    return geoMetadata?.value || "Global"
  }

  const getCreationDate = () => {
    const dateMetadata = dataset.metadata?.find((item) => item.metadata_item.label === "Date of Creation of Dataset")
    return dateMetadata?.value ? formatDate(dateMetadata.value) : formatDate(dataset.created)
  }

  const shouldShowSeeMore = dataset.description && dataset.description.length > 150
  const displayDescription =
    shouldShowSeeMore && !showFullDescription ? dataset.description.substring(0, 150) + "..." : dataset.description

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-blue-900 mb-4 leading-tight hover:text-blue-800 transition-colors cursor-pointer">
            {dataset.title}
          </h3>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-orange-500" />
              <span>Last Updated: {getCreationDate()}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-2 text-orange-500" />
              <span>Downloads: {dataset.download_count || 500}+</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-orange-500" />
              <span>Geography: {getGeography()}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mb-4"></div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {displayDescription}
              {shouldShowSeeMore && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-900 text-sm font-medium hover:text-blue-800 transition-colors ml-1"
                >
                  {showFullDescription ? "See Less" : "See More"}
                </button>
              )}
            </p>
          </div>

          {/* Tags */}
          {dataset.tags && dataset.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {dataset.tags.slice(0, 6).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end justify-between w-48">
          <div className="flex items-center text-xs text-gray-500">
            <span>published by</span>
            <Building2 className="h-4 w-4 ml-2 text-gray-400" />
          </div>

          <div className="flex space-x-2">
            <Download className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
            <BarChart3 className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
}
