"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { FilterState, ApiResponse } from "@/types"

interface FilterSidebarProps {
  filters: FilterState
  aggregations: ApiResponse["aggregations"]
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
  isMobile?: boolean
  onMobileClose?: () => void
}

interface FilterSectionProps {
  title: string
  count?: number
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, count, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
   <div className="mb-4">
  <div
    className={`px-4 py-3 rounded-sm cursor-pointer flex items-center justify-between ${
      isOpen ? 'bg-blue-100' : 'bg-gray-100'
    }`}
    onClick={() => setIsOpen(!isOpen)}
  >
    <span className="text-sm font-medium text-gray-700">
      {title} {count !== undefined && `(${count})`}
    </span>
    {isOpen ? (
      <Minus className="h-4 w-4 text-blue-500" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-500" />
    )}
  </div>

  {isOpen && <div className="mt-3 space-y-3 px-1">{children}</div>}
</div>
  )
}

export default function FilterSidebar({
  filters,
  aggregations,
  onFilterChange,
  onReset,
  isMobile = false,
  onMobileClose,
}: FilterSidebarProps) {
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0)
    setHasChanges(hasActiveFilters)
  }, [filters])

  const handleFilterToggle = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    const newFilters = {
      ...filters,
      [category]: newValues,
    }

    onFilterChange(newFilters)

    if (isMobile && onMobileClose && newValues.length > currentValues.length) {
      setTimeout(() => {
        onMobileClose()
      }, 300)
    }
  }

  const sectorOptions = Object.keys(aggregations?.sectors || {})
  const geographyOptions = Object.keys(aggregations?.Geography || {})
  const tagOptions = Object.keys(aggregations?.tags || {})
  const formatOptions = Object.keys(aggregations?.formats || {})

  const timePeriodOptions = ["2000-2003", "2003-2006", "2006-2009", "2009-2012", "2012-2015"]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full sm:w-[320px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">FILTERS</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium p-0 h-auto"
          disabled={!hasChanges}
        >
          RESET
        </Button>
      </div>

      <FilterSection title="Sectors" count={5}>
        {[
          "Biodiversity Conservation",
          "Climate Finance",
          "Climate and Health",
          "Disaster Risk Reduction",
          "Energy Transition",
        ].map((sector) => (
          <div key={sector} className="flex items-center space-x-3 ">
            <Checkbox
              id={`sector-${sector}`}
              checked={filters.sectors.includes(sector)}
              onCheckedChange={() => handleFilterToggle("sectors", sector)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label
              htmlFor={`sector-${sector}`}
              className="text-sm text-gray-700 cursor-pointer flex-1 leading-tight"
              title={sector}
            >
              {sector.length > 25 ? sector.substring(0, 25) + "..." : sector}
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Time Period" count={7}>
        {timePeriodOptions.map((period) => (
          <div key={period} className="flex items-center space-x-3">
            <Checkbox
              id={`period-${period}`}
              checked={filters.geography.includes(period)}
              onCheckedChange={() => handleFilterToggle("geography", period)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label htmlFor={`period-${period}`} className="text-sm text-gray-700 cursor-pointer">
              {period}
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Data Type" count={4}>
        {["CSV", "GeoJSON", "XLS", "API"].map((format) => (
          <div key={format} className="flex items-center space-x-3">
            <Checkbox
              id={`format-${format}`}
              checked={filters.formats.includes(format) || format === "CSV" || format === "GeoJSON" || format === "XLS"}
              onCheckedChange={() => handleFilterToggle("formats", format)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label htmlFor={`format-${format}`} className="text-sm text-gray-700 cursor-pointer">
              {format}
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Tags" count={30} defaultOpen={false}>
        {tagOptions.slice(0, 10).map((tag) => (
          <div key={tag} className="flex items-center space-x-3">
            <Checkbox
              id={`tag-${tag}`}
              checked={filters.tags.includes(tag)}
              onCheckedChange={() => handleFilterToggle("tags", tag)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label htmlFor={`tag-${tag}`} className="text-sm text-gray-700 cursor-pointer flex-1" title={tag}>
              {tag.length > 25 ? tag.substring(0, 25) + "..." : tag}
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Licenses" count={5} defaultOpen={false}>
        {["Open", "Restricted", "Commercial", "Government", "Creative Commons"].map((license) => (
          <div key={license} className="flex items-center space-x-3">
            <Checkbox
              id={`license-${license}`}
              checked={filters.geography.includes(license)}
              onCheckedChange={() => handleFilterToggle("geography", license)}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label htmlFor={`license-${license}`} className="text-sm text-gray-700 cursor-pointer">
              {license}
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Geographies" count={15} defaultOpen={false}>
        {geographyOptions.slice(0, 10).map((geo) => (
          <div key={geo} className="flex items-center space-x-3">
            <Checkbox
              id={`geo-${geo}`}
              checked={filters.geography.includes(geo)}
              onCheckedChange={() => handleFilterToggle("geography", geo)}
              className="data-[state=checked]:bg-orange-500data-[state=checked]:border-orange-500"
            />
            <label htmlFor={`geo-${geo}`} className="text-sm text-gray-700 cursor-pointer flex-1" title={geo}>
              {geo.length > 20 ? geo.substring(0, 20) + "..." : geo}
            </label>
          </div>
        ))}
      </FilterSection>
    </div>
  )
}
