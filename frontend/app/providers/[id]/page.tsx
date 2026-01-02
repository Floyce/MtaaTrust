"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, ShieldCheck, Clock, Calendar, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { BookingModal } from "@/components/booking-modal"

// Mock Data for a single provider
const MOCK_PROVIDER = {
    id: "1",
    name: "Juma Ochieng",
    business: "Juma's Electricals",
    category: "Electrician",
    rating: 4.8,
    reviewsCount: 124,
    location: "Kilimani, Nairobi",
    price: "KES 500 - 5000",
    verified: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juma",
    joined: "March 2023",
    responseTime: "Within 1 hr",
    about: "Professional electrician with over 7 years of experience in residential and commercial wiring. I specialize in fault finding, installations, and emergency repairs. Fully certified by EPRA and insured.",
    services: [
        "Full House Rewiring",
        "Socket & Switch Installation",
        "Fault Diagnosis",
        "Lighting Installation",
        "Consumer Unit Upgrades"
    ],
    reviews: [
        { id: 1, user: "Alice M.", text: "Juma was very professional and fixed our socket in no time.", rating: 5, date: "2 days ago" },
        { id: 2, user: "Kevin K.", text: "Good work but arrived slightly late due to traffic.", rating: 4, date: "1 week ago" },
        { id: 3, user: "Mama Boi", text: "Very trustworthy, I left him in the house tailored.", rating: 5, date: "2 weeks ago" }
    ]
}

export default function ProviderProfilePage({ params }: { params: { id: string } }) {
    const [isBooking, setIsBooking] = useState(false)

    // In a real app we would fetch data based on params.id
    const provider = MOCK_PROVIDER

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Navigation Breadcrumb */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
                    <Link href="/providers" className="flex items-center text-sm text-slate-500 hover:text-teal-700 font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-[1fr_350px] gap-8">

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Header Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                    <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{provider.business}</h1>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-slate-600 font-medium">{provider.name}</span>
                                                {provider.verified && (
                                                    <BadgeVerified />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                <span className="font-bold text-slate-900">{provider.rating}</span>
                                                <span className="text-slate-500 text-xs">({provider.reviewsCount})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 pt-2">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4 text-teal-600" />
                                            {provider.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-teal-600" />
                                            Responds {provider.responseTime}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-teal-600" />
                                            Joined {provider.joined}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-4">
                            <h2 className="text-xl font-bold text-slate-900">About {provider.name.split(' ')[0]}</h2>
                            <p className="text-slate-600 leading-relaxed">
                                {provider.about}
                            </p>

                            <h3 className="font-semibold text-slate-900 pt-4">Services Offered</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {provider.services.map((service) => (
                                    <div key={service} className="flex items-center gap-2 text-slate-600">
                                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                        {service}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">Community Reviews</h2>
                                <Button variant="outline" size="sm">Write a Review</Button>
                            </div>

                            <div className="space-y-6">
                                {provider.reviews.map((review) => (
                                    <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-slate-900">{review.user}</div>
                                            <span className="text-xs text-slate-400">{review.date}</span>
                                        </div>
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                        <p className="text-slate-600 text-sm">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar / Floating Action */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-teal-100 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="text-slate-500 text-sm mb-1">Starting from</div>
                                <div className="text-3xl font-bold text-slate-900">{provider.price}</div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700" onClick={() => setIsBooking(true)}>
                                    Book Now
                                </Button>
                                <Button variant="outline" className="w-full h-12 text-teal-700 border-teal-200 hover:bg-teal-50">
                                    <MessageSquare className="h-4 w-4 mr-2" /> Chat with {provider.name.split(' ')[0]}
                                </Button>
                            </div>

                            <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed">
                                <ShieldCheck className="h-5 w-5 text-teal-600 shrink-0" />
                                <p>
                                    <strong>MtaaTrust Guarantee:</strong> Your payment is held securely in escrow until the job is completed to your satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBooking}
                onClose={() => setIsBooking(false)}
                providerName={provider.name}
                rate={provider.price}
            />
        </div>
    )
}

function BadgeVerified() {
    return (
        <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            Verified
        </span>
    )
}
