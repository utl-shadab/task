"use client"

import { Network, Github, Linkedin, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2B5F7F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <Network className="h-8 w-8 text-orange-400" />
              <span className="text-xl font-semibold">CivicDataSpace</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="hover:text-orange-400 transition-colors">ABOUT US</button>
              <button className="hover:text-orange-400 transition-colors">SITEMAP</button>
              <button className="hover:text-orange-400 transition-colors">CONTACT US</button>
            </div>
          </div>

          {/* Social Links and Made By */}
          <div className="flex flex-col items-start md:items-end space-y-4 mt-6 md:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Follow Us</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Github className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span>made by</span>
              <Network className="h-4 w-4 text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
