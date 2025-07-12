"use client";

import { useState } from "react";
import { Calendar, Download, MapPin, BarChart3 } from "lucide-react";
import type { Dataset } from "@/types";

interface DatasetListItemProps {
  dataset: Dataset;
}

export default function DatasetListItem({ dataset }: DatasetListItemProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getGeography = () => {
    const geoMetadata = dataset.metadata?.find(
      (item) => item.metadata_item.label === "Geography"
    );
    return geoMetadata?.value || "Global";
  };

  const createdDateFormatter = (rawDate: any) => {
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate.replace(/\//g, "-");
  };

  const getCreationDate = () => {
    const dateMetadata = dataset.metadata?.find(
      (item) => item.metadata_item.label === "Date of Creation of Dataset"
    );
    return dateMetadata?.value
      ? formatDate(dateMetadata.value)
      : formatDate(dataset.created);
  };

  const formateImage = (format: string, index: number) => {
    switch (format.toUpperCase()) {
      case "CSV":
        return <img key={index} className="h-6 w-6" src="/format/csv.svg" alt="CSV" />;
      case "ZIP":
        return <img key={index} className="h-6 w-6" src="/format/zip.svg" alt="ZIP" />;
      case "PDF":
        return <img key={index} className="h-6 w-6" src="/format/pdf.svg" alt="PDF" />;
      case "XLS":
        return <img key={index} className="h-6 w-6" src="/format/xls.svg" alt="XLS" />;
      case "XLSX":
        return <img key={index} className="h-6 w-6" src="/format/xlsx.svg" alt="XLSX" />;
      case "JSON":
        return <img key={index} className="h-6 w-6" src="/format/json.svg" alt="JSON" />;
      default:
        return (
          <span key={index} className="text-xs text-gray-500 border px-1 rounded">
            {format}
          </span>
        );
    }
  };

  const shouldShowSeeMore = dataset.description && dataset.description.length > 150;
  const displayDescription =
    shouldShowSeeMore && !showFullDescription
      ? dataset.description.substring(0, 150) + "..."
      : dataset.description;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex flex-col md:flex-row md:gap-6 gap-4">
        {/* Left Main Content */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-2 sm:mb-4 leading-tight hover:text-blue-800 transition-colors cursor-pointer">
            {dataset.title}
          </h3>

          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-4">
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
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
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

          {/* Tags, Sectors, Formats */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              {/* Tags */}
              {dataset.tags && dataset.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-700">Tags:</span>
                  {dataset.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-green-100 text-gray-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Sectors */}
              {dataset.sectors && dataset.sectors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-gray-700">Sectors:</span>
                  {dataset.sectors.slice(0, 6).map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Formats + Icons */}
            <div className="flex flex-col sm:items-end gap-2">
              {dataset.formats && dataset.formats.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                  <span>Formats:</span>
                  {dataset.formats.slice(0, 6).map((item, index) => formateImage(item, index))}
                </div>
              )}
              <div className="flex space-x-2">
                <Download className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800" />
                <BarChart3 className="h-4 w-4 text-blue-900 cursor-pointer hover:text-blue-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Right-side Publisher Info */}
        <div className="flex md:flex-col items-center justify-between w-full md:w-48 text-xs text-gray-500 mt-4 md:mt-0">
          <div className="flex items-center">
            <span>Published by</span>
            <img
              className="h-4 w-4 ml-2 rounded-full"
              src={dataset.organization.logo}
              alt="Organization Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
