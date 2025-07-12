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

  const createdDateFormatter = (rawDate: any) => {
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    const finalFormat = formattedDate.replace(/\//g, "-");
    return finalFormat;
  }

  const getCreationDate = () => {
    const dateMetadata = dataset.metadata?.find((item) => item.metadata_item.label === "Date of Creation of Dataset")
    return dateMetadata?.value ? formatDate(dateMetadata.value) : formatDate(dataset.created)
  }

  const formateImage = (format: string, index: number) => {
    switch (format.toUpperCase()) {
      case "CSV":
        return <img key={index} className="h-6 w-6" src="/format/csv.svg" alt="CSV format" />
      case "ZIP":
        return <img key={index} className="h-6 w-6" src="/format/zip.svg" alt="ZIP format" />
      case "PDF":
        return <img key={index} className="h-6 w-6" src="/format/pdf.svg" alt="PDF format" />
      case "XLS":
        return <img key={index} className="h-6 w-6" src="/format/xls.svg" alt="PDF format" />
      case "XLSX":
        return <img key={index} className="h-6 w-6" src="/format/xlsx.svg" alt="PDF format" />
      case "JSON":
        return <img key={index} className="h-6 w-6" src="/format/json.svg" alt="PDF format" />

      default:
        return (
          <span key={index} className="text-xs text-gray-500 border px-1 rounded">
            {format}
          </span>
        )
    }
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
              <Calendar className="h-4 w-4 mr-2 text-blue-800" />
              <span>Last Updated: {createdDateFormatter(dataset.created)}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-2 text-orange-500" />
              <span>Downloads: {dataset.download_count ? `${dataset.download_count}+` : 0}</span>
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

          <div className="flex justify-between ">
            <div className="left">
              {/* Tags */}
              {dataset.tags && dataset.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="inline-flex items-center text-xs text-gray-700 font-medium">  Tags: </span>
                  {dataset.tags.slice(0, 6).map((tags) => (
                    <span
                      key={tags}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-gray-700 font-medium"
                    >
                      {tags}
                    </span>
                  ))}
                </div>
              )}
              {dataset.sectors && dataset.sectors.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  <span className="inline-flex items-center text-xs text-gray-700 font-medium">  Sectors: </span>
                  {dataset.sectors.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="right">
              {dataset.formats && dataset.formats.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4 text-gray-700 text-xs items-center">
                  Formats:   {dataset.formats.slice(0, 6).map((item, index) => formateImage(item, index))}
                </div>
              )}
              <div className="flex space-x-2">
                <Download className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
                <BarChart3 className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800 transition-colors" />
              </div>
            </div>

          </div>

        </div>
        <div className="flex flex-col items-end justify-between w-48">
          <div className="flex items-center text-xs text-gray-500">
            <span>published by</span>
            <img className="h-4 w-4 ml-2 rounded-full" src={dataset.organization.logo} />
            {/* <Building2 className="h-4 w-4 ml-2 text-gray-400" /> */}
          </div>


        </div>
      </div>
    </div>
  )
}
