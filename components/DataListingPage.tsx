"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid3X3, List, Filter, X, ChevronDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FilterSidebar from "./FilterSidebar"
import FilterChips from "./FilterChips"
import DatasetCard from "./DatasetCard"
import DatasetListItem from "./DatasetListItem"
import LoadingSkeleton from "./LoadingSkeleton"
import Pagination from "./Pagination"
import ErrorState from "./ErrorBoundary"
import { useDebounce } from "@/hooks/useDebounce"
import type { Dataset, ApiResponse, FilterState } from "@/types"

const ITEMS_PER_PAGE = 9

export default function DataListingPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState<FilterState>({
    sectors: [],
    geography: [],
    tags: [],
    formats: [],
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [aggregations, setAggregations] = useState<ApiResponse["aggregations"]>({
    Geography: {},
    sectors: {},
    tags: {},
    formats: {},
  })

  // console.log("aggregations", aggregations);

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()

      if (debouncedSearchQuery) params.append("query", debouncedSearchQuery)
      if (filters.sectors.length) params.append("sectors", filters.sectors.join(","))
      if (filters.geography.length) params.append("Geography", filters.geography.join(","))
      if (filters.tags.length) params.append("tags", filters.tags.join(","))
      if (filters.formats.length) params.append("formats", filters.formats.join(","))

      params.append("page", currentPage.toString())
      params.append("size", ITEMS_PER_PAGE.toString())
      params.append("sort", sortBy)
      params.append("order", "desc")

      const response = await fetch(`https://api.datakeep.civicdays.in/api/search/dataset/?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json();

      // console.log("data", data);

      setDatasets(data.results || [])
      setTotalResults(data.total || 0)
      setAggregations(
        data.aggregations || {
          Geography: {},
          sectors: {},
          tags: {},
          formats: {},
        },
      )
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch data")
      setDatasets([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearchQuery, filters, currentPage, sortBy])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleRemoveFilter = (category: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [category]: filters[category].filter((item) => item !== value),
    }
    handleFilterChange(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      sectors: [],
      geography: [],
      tags: [],
      formats: [],
    })
    setCurrentPage(1)
  }

  const handleMobileFilterClose = () => {
    setShowMobileFilters(false)
  }

  const handleRetry = () => {
    setError(null)
    fetchData()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-orange-100 py-2 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">Home</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">All Data</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1 flex gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block flex-shrink-0">
          <div className="sticky top-6">
            <FilterSidebar
              filters={filters}
              aggregations={aggregations}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-shrink-0 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center  justify-between mb-4">
              <div className="relative flex-1 max-w-lg w-full ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Start typing to search for any Dataset"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center space-x-4 ">

                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none border-0 px-3 py-2"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none border-0 px-3 py-2"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-6 py-2 pr-16 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="recent">Latest Updated</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 pointer-events-none">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <AnimatePresence>
              <FilterChips filters={filters} onRemoveFilter={handleRemoveFilter} onClearAll={handleResetFilters} />
            </AnimatePresence>
          </div>

          <div className="flex-1 overflow-auto">
            {error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : loading ? (
              <LoadingSkeleton viewMode={viewMode} />
            ) : datasets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No results found.</p>
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                <AnimatePresence mode="popLayout">
                  {datasets.map((dataset, index) => (
                    <motion.div
                      key={dataset.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        layout: { duration: 0.3 },
                      }}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                    >
                      {viewMode === "grid" ? <DatasetCard dataset={dataset} /> : <DatasetListItem dataset={dataset} />}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && !error && datasets.length > 0 && (
              <div className="mt-8 flex-shrink-0">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalResults={totalResults}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <motion.button
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40"
        onClick={() => setShowMobileFilters(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <Filter className="h-6 w-6" />
      </motion.button>


      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={handleMobileFilterClose}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "100%",
                y: "100%",
                transformOrigin: "bottom right",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0,
                x: "100%",
                y: "100%",
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 400,
                duration: 0.4,
              }}
              className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto hide-scrollbar"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={handleMobileFilterClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterSidebar
                  filters={filters}
                  aggregations={aggregations}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  isMobile={true}
                  onMobileClose={handleMobileFilterClose}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
