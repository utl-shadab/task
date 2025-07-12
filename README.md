# CivicDataSpace - Data Listing Platform

A modern, responsive data listing platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This application provides a comprehensive interface for browsing, searching, and filtering civic datasets with smooth animations and an intuitive user experience.

---

## 🚀 Features

### 🯩 Core Functionality

* **Dataset Browsing**: Grid and list view modes for dataset exploration
* **Advanced Search**: Real-time search with debounced API calls
* **Smart Filtering**: Multi-category filters with dynamic options from API
* **Responsive Design**: Seamless experience across desktop, tablet, and mobile
* **Pagination**: Efficient data loading with page-based navigation

### 🎯 User Experience

* **Smooth Animations**: Framer Motion powered transitions and interactions
* **Loading States**: Shimmer effects and skeleton screens
* **Error Handling**: Graceful error states with retry functionality
* **Mobile-First**: Touch-friendly interface with custom mobile filter drawer

### 💫 Advanced Features

* **Filter Chips**: Interactive filter management with easy removal
* **Location Tooltips**: Smart handling of multiple geographic locations
* **Content Expansion**: "See More/Less" for long descriptions
* **Auto-Close Filters**: Mobile filters close automatically after selection

---

## 🛠 Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Font**: Poppins (Google Fonts)
* **UI Components**: Radix UI primitives
* **State Management**: React Hooks

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd civic-data-listing
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```bash
civic-data-listing/
├── app/
│   ├── fonts.ts              # Font configuration
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   └── input.tsx
│   ├── DataListingPage.tsx   # Main page component
│   ├── DatasetCard.tsx       # Dataset card component
│   ├── DatasetListItem.tsx   # Dataset list item
│   ├── FilterSidebar.tsx     # Filter panel
│   ├── FilterChips.tsx       # Active filter chips
│   ├── Header.tsx            # Site header
│   ├── Footer.tsx            # Site footer
│   ├── LoadingSkeleton.tsx   # Loading states
│   ├── Pagination.tsx        # Pagination controls
│   └── ErrorBoundary.tsx     # Error handling
├── hooks/
│   └── useDebounce.ts        # Debounce hook
├── types/
│   └── index.ts              # TypeScript definitions
└── lib/
    └── utils.ts              # Utility functions
```

---

## ⚙️ Configuration

### Environment Variables

> No environment variables are required for basic functionality. The application uses the public API.

### Customization

* **Colors**: Modify Tailwind config for brand colors
* **Fonts**: Update font configuration in `app/fonts.ts`
* **API**: Change API endpoint in `DataListingPage.tsx`

---

## 📱 Responsive Design

### Desktop (≥780px)

* Two-column layout with fixed filter sidebar
* Grid view with 3 columns
* Hover effects and smooth transitions

### Mobile (<768px)

* Single column layout
* Floating filter button
* Diagonal slide-in filter drawer
* Touch-optimized interactions

---

## 🎨 Design System

### Colors

* **Primary**: Blue `#2563eb`
* **Secondary**: Orange `#f97316`
* **Success**: Green `#16a34a`
* **Text**: Gray scale `#374151`, `#6b7280`, `#9ca3af`

### Typography

* **Font Family**: Poppins
* **Weights**: 300, 400, 500, 600, 700,800,900
* **Sizes**: Responsive scale from `12px` to `24px`

### Spacing

* **Grid Gap**: 24px (1.5rem)
* **Card Padding**: 24px (1.5rem)
* **Section Margins**: 24px (1.5rem)

---

## 🌐 API Integration

### Endpoint

```
GET /api/search/dataset/
```

### Parameters

* `query`: Search term
* `sectors`: Comma-separated sector filters
* `Geography`: Geographic filters
* `tags`: Tag filters
* `formats`: Format filters
* `page`: Page number
* `size`: Results per page
* `sort`: Sort method (`recent` / `alphabetical`)
* `order`: Sort order (`asc` / `desc`)

### Response Format

```ts
interface ApiResponse {
  results: Dataset[]
  total: number
  aggregations: {
    Geography: Record<string, number>
    sectors: Record<string, number>
    tags: Record<string, number>
    formats: Record<string, number>
  }
}
```

---

## ✨ Animations

### Page Load

* Staggered card entrance animations
* Smooth fade-in transitions
* Progressive loading states

### Interactions

* Hover effects on cards and buttons
* Filter chip animations
* Mobile drawer transitions
* Layout changes between grid/list views

### Performance

* Hardware-accelerated transforms
* Optimized re-renders
* Smooth 60fps animations

---

## 🔧 Testing

### Manual Testing Checklist

* [ ] Search functionality works
* [ ] Filters apply correctly
* [ ] Pagination navigates properly
* [ ] Mobile drawer opens/closes
* [ ] Cards display all information
* [ ] Error states show appropriately
* [ ] Loading states appear during API calls
