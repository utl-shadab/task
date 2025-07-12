"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { FilterState, FilterChip } from "@/types"

interface FilterChipsProps {
  filters: FilterState
  onRemoveFilter: (category: keyof FilterState, value: string) => void
  onClearAll: () => void
}

export default function FilterChips({ filters, onRemoveFilter, onClearAll }: FilterChipsProps) {
  const getFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = []

    Object.entries(filters).forEach(([category, values]) => {
      values.forEach((value:any) => {
        chips.push({
          category: category as keyof FilterState,
          value,
          label: value,
        })
      })
    })

    return chips
  }

  const chips = getFilterChips()

  if (chips.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Active Filters</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {chips.map((chip, index) => (
            <motion.div
              key={`${chip.category}-${chip.value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <span className="text-xs text-blue-500 capitalize">{chip.category}:</span>
              <span>{chip.label}</span>
              <button
                onClick={() => onRemoveFilter(chip.category, chip.value)}
                className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
