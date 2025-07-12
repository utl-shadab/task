"use client"

import { Search, Network } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-[#2B5F7F] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Network className="h-8 w-8 text-orange-400" />
            <span className="text-xl font-semibold">CivicDataSpace</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="flex items-center space-x-1 hover:text-orange-400 transition-colors">
              <Search className="h-4 w-4" />
              <span>ALL DATA</span>
            </button>
            <button className="hover:text-orange-400 transition-colors">SECTORS</button>
            <button className="hover:text-orange-400 transition-colors">USE CASES</button>
            <button className="hover:text-orange-400 transition-colors">PUBLISHERS</button>
            <button className="hover:text-orange-400 transition-colors">ABOUT US</button>
          </nav>

          {/* Login Button */}
          <Button className="bg-green-400 hover:bg-green-500 text-gray-900 font-medium">LOGIN / SIGN UP</Button>
        </div>
      </div>
    </header>
  )
}
