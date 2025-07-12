import Header from "@/components/Header"
import DataListingPage from "@/components/DataListingPage"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DataListingPage />
      <Footer />
    </div>
  )
}
