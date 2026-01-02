"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Need to check if Badge exists, if not I'll just use a styled span or create it.
// Assuming Badge doesn't exist yet based on previous file list. I'll use standard Tailwind for now or create a simple Badge component if needed.
// actually, I'll stick to Tailwind classes for badges to avoid dependency issues for now.
import { Search, MapPin, Star, Filter, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Data
const MOCK_PROVIDERS = [
    {
        id: "1",
        name: "Juma Ochieng",
        business: "Juma's Electricals",
        category: "Electrician",
        rating: 4.8,
        reviews: 124,
        location: "Kilimani, Nairobi",
        price: "KES 500 - 5000",
        verified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juma",
        tags: ["Wiring", "Repairs", "Installation"]
    },
    {
        id: "2",
        name: "Sarah Wanjiku",
        business: "Sparkle Clean Services",
        category: "Cleaning",
        rating: 4.9,
        reviews: 89,
        location: "Westlands, Nairobi",
        price: "KES 1000/hr",
        verified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        tags: ["Deep Clean", "Laundry", "Office"]
    },
    {
        id: "3",
        name: "Peter Kamau",
        business: "Pete the Plumber",
        category: "Plumbing",
        rating: 4.6,
        reviews: 56,
        location: "Karen, Nairobi",
        price: "KES 1500 visit",
        verified: false,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter",
        tags: ["Leaks", "Drains", "Tanks"]
    },
    {
        id: "4",
        name: "Mama Mboga Delivery",
        business: "Fresh Greens Ltd",
        category: "Groceries",
        rating: 4.9,
        reviews: 210,
        location: "Kileleshwa, Nairobi",
        price: "Market Price",
        verified: true,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mama",
        tags: ["Vegetables", "Fruits", "Delivery"]
    }
]

export default function ProvidersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [locationTerm, setLocationTerm] = useState("")

    // Simple filter logic
    const filteredProviders = MOCK_PROVIDERS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLocation = p.location.toLowerCase().includes(locationTerm.toLowerCase())
        return matchesSearch && matchesLocation
    })

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Search Section */}
            <div className="bg-teal-700 text-white pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold">Find Trusted Local Pros</h1>
                    <p className="text-teal-100 text-lg max-w-2xl mx-auto">
                        Search over 500+ verified service providers in Nairobi.
                        From plumbers to electricians, we've got you covered.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <Input
                                className="pl-10 border-none shadow-none h-12 text-slate-900 placeholder:text-slate-400 focus-visible:ring-0"
                                placeholder="What do you need help with?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-px bg-slate-200 hidden md:block" />
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <Input
                                className="pl-10 border-none shadow-none h-12 text-slate-900 placeholder:text-slate-400 focus-visible:ring-0"
                                placeholder="Location (e.g. Kilimani)"
                                value={locationTerm}
                                onChange={(e) => setLocationTerm(e.target.value)}
                            />
                        </div>
                        <Button className="h-12 px-8 bg-teal-600 hover:bg-teal-500 text-white rounded-xl">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filters & Content */}
            <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[250px_1fr] gap-8">
                {/* Sidebar Filters */}
                <div className="hidden lg:block space-y-6">
                    <div className="flex items-center gap-2 font-semibold text-slate-900 pb-2 border-b">
                        <Filter className="h-4 w-4" /> Filters
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-slate-900">Category</h3>
                        <div className="space-y-2">
                            {['Plumbing', 'Electrical', 'Cleaning', 'Moving', 'Gardening'].map((cat) => (
                                <label key={cat} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-teal-600">
                                    <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-slate-900">Price Range</h3>
                        <div className="space-y-2">
                            {['Under KES 1000', 'KES 1000 - 5000', 'KES 5000+'].map((price) => (
                                <label key={price} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-teal-600">
                                    <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                                    {price}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {filteredProviders.length} Providers Found
                        </h2>
                        <div className="flex gap-2 lg:hidden">
                            <Button variant="outline" size="sm">
                                <Filter className="h-4 w-4 mr-2" /> Filters
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredProviders.map((provider) => (
                            <Card key={provider.id} className="hover:shadow-md transition-shadow cursor-pointer group border-slate-200">
                                <CardContent className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden">
                                                <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                                    {provider.business}
                                                </h3>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    {provider.name} • {provider.category}
                                                </p>
                                            </div>
                                        </div>
                                        {provider.verified && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                                Verified
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="font-semibold text-slate-900">{provider.rating}</span>
                                            <span className="text-slate-400">({provider.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-slate-400" />
                                            {provider.location}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {provider.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-5 pt-0 border-t bg-slate-50/50 rounded-b-xl flex items-center justify-between">
                                    <span className="font-semibold text-slate-900">{provider.price}</span>
                                    <Link href={`/providers/${provider.id}`}>
                                        <Button size="sm" variant="ghost" className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 p-0 h-auto font-medium">
                                            View Profile <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
