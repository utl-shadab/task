"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const navLinks = [
  { label: "ALL DATA", icon: <Search className="h-5 w-5" /> },
  { label: "SECTORS" },
  { label: "USE CASES" },
  { label: "PUBLISHERS" },
  { label: "ABOUT US" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="sticky top-0 z-50 bg-white text-primary-foreground border-b-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Network className="h-8 w-8 text-secondary" />
            <span className="text-xl font-semibold">CivicDataSpace</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center space-x-1 hover:text-secondary transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button variant="secondary">LOGIN / SIGN UP</Button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden z-50 fixed top-4 right-4">
            <button
              onClick={toggleMenu}
              className={clsx(
                "p-2 rounded-full transition-all duration-300 shadow-md",
                isOpen
                  ? "bg-blue-600 text-white"
                  : "text-white bg-blue-600"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.8, x: 100, y: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100, y: -100 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed inset-0 z-40 bg-gray-100 text-gray-700 flex flex-col items-center justify-center space-y-8 text-xl font-semibold px-6"
          >
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition duration-200 text-center text-2xl sm:text-3xl"
              >
                {link.label}
              </a>
            ))}

            <Button
              onClick={() => setIsOpen(false)}
              className="mt-6 px-4 py-2  text-lg font-medium bg-gray-700 text-gray-100 hover:bg-gray-100 transition duration-200 shadow"
            >
              LOGIN / SIGN UP
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
