"use client"

import { useState } from "react"
import { Calendar, Download, MapPin, BarChart3, Building2 } from "lucide-react"
import type { Dataset } from "@/types"

interface DatasetCardProps {
  dataset: Dataset
}

export default function DatasetCard({ dataset }: DatasetCardProps) {
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
    const geography = geoMetadata?.value || "Global"
    if (geography.includes(",")) {
      const locations = geography.split(",").map((loc) => loc.trim())
      const firstLocation = locations[0]
      const remainingCount = locations.length - 1

      return {
        display: firstLocation,
        hasMore: remainingCount > 0,
        tooltip: geography,
        count: remainingCount,
      }
    }

    return {
      display: geography,
      hasMore: false,
      tooltip: geography,
      count: 0,
    }
  }

  const getCreationDate = () => {
    const dateMetadata = dataset.metadata?.find((item) => item.metadata_item.label === "Date of Creation of Dataset")
    return dateMetadata?.value ? formatDate(dateMetadata.value) : formatDate(dataset.created)
  }

  const shouldShowSeeMore = dataset.description && dataset.description.length > 150
  const displayDescription =
    shouldShowSeeMore && !showFullDescription ? dataset.description.substring(0, 150) + "..." : dataset.description

  const geographyInfo = getGeography()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between min-h-[360px]">
      <h3 className="text-md font-medium text-blue-900 mb-4 leading-tight hover:text-blue-800 transition-colors cursor-pointer">
        {dataset.title}
      </h3>


      <div className="flex items-center gap-6 mb-4 text-xs text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-orange-500" />
          <span>{getCreationDate()}</span>
        </div>

        <div className="flex items-center">
          <Download className="h-4 w-4 mr-2 text-orange-500" />
          <span>{dataset.download_count || 500}+</span>
        </div>

        <div className="flex items-center relative group">
          <MapPin className="h-4 w-4 mr-2 text-orange-500" />
          <span className="cursor-help">
            {geographyInfo.display}
            {geographyInfo.hasMore && <span className="text-gray-400 ml-1">+{geographyInfo.count}</span>}
          </span>


          {geographyInfo.hasMore && (
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-100 text-gray-700 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[99999] whitespace-normal break-words max-w-sm">
              {geographyInfo.tooltip}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></div>
            </div>
          )}
        </div>
      </div>


      <div className="border-t border-gray-200 mb-4"></div>
      <div className="mb-6">
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


      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">

          <div className="flex space-x-3">
            <Download className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
            <BarChart3 className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
          </div>


          <div className="flex items-center text-xs text-gray-500">
            <span>published by</span>
            <Building2 className="h-4 w-4 ml-2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
