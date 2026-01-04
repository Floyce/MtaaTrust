"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertTriangle, Users, Briefcase, ChevronRight, Star, Clock, Shield, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

// Mock Data for "My Active Jobs"
const ACTIVE_JOBS = [
  { id: 1, service: "Plumbing Repair", provider: "John Mwangi", status: "In Progress", date: "Today, 2:00 PM" },
]

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect Provider to their specific dashboard
    if (!loading && user && user.user_type === 'provider') {
      router.push("/provider-dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }

  // --------------------------------------------------------------------------
  // CONSUMER DASHBOARD VIEW (Logged In)
  // --------------------------------------------------------------------------
  if (user && user.user_type === 'consumer') {
    return (
      <div className="min-h-screen bg-neutral-50 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-teal-900">Karibu back, {user.full_name?.split(' ')[0] || 'User'}! 👋</h1>
              <p className="text-neutral-600">Here's what's happening with your home services.</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 mb-8 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="What do you need help with?"
                className="pl-10 h-11 border-gray-200 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <Button className="h-11 px-8 font-bold bg-primary hover:bg-emerald-800">Search</Button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/scan" className="group">
              <div className="bg-white hover:bg-green-50 p-4 rounded-xl border border-neutral-200 transition-all cursor-pointer h-full">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-bold text-neutral-800">Mtaa Scan</h3>
                <p className="text-xs text-neutral-500">Diagnose issues with AI</p>
              </div>
            </Link>

            <Link href="/sambaza" className="group">
              <div className="bg-white hover:bg-green-50 p-4 rounded-xl border border-neutral-200 transition-all cursor-pointer h-full">
                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-indigo-700" />
                </div>
                <h3 className="font-bold text-neutral-800">Group Booking</h3>
                <p className="text-xs text-neutral-500">Share & save on repairs</p>
              </div>
            </Link>

            <div className="bg-white hover:bg-red-50 p-4 rounded-xl border border-neutral-200 transition-all cursor-pointer group">
              <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-bold text-neutral-800">Emergency SOS</h3>
              <p className="text-xs text-neutral-500">Immediate help nearby</p>
            </div>

            <div className="bg-white hover:bg-green-50 p-4 rounded-xl border border-neutral-200 transition-all cursor-pointer group flex flex-col justify-center items-center border-dashed">
              <span className="text-sm font-medium text-neutral-400 group-hover:text-primary">More Features +</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: Active Jobs & Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Job Card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" /> Active Jobs
                  </h2>
                  <Button variant="link" className="text-primary">View All</Button>
                </div>

                {ACTIVE_JOBS.map(job => (
                  <div key={job.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center border text-lg">🔧</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-800">{job.service}</h4>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span>{job.provider}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-medium">{job.status}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-900">{job.date}</p>
                      <Button size="sm" variant="outline" className="mt-1 h-8">Track Provider</Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cashback Promo */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h2 className="font-bold text-lg text-green-900 mb-2">Did you know?</h2>
                <p className="text-green-800/80 mb-4">You can now pay for services using MtaaCoins and get 5% cashback on every repair.</p>
                <Button className="bg-green-700 hover:bg-green-800 text-white border-none shadow-lg shadow-green-900/20">Check Wallet</Button>
              </div>
            </div>

            {/* Right Col: Suggestions */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-1">Invite a Neighbor</h3>
                  <p className="text-slate-300 text-sm mb-4">Get KES 500 for every neighbor who books a job.</p>
                  <Button variant="secondary" className="w-full font-bold">Copy Invite Link</Button>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-sm">
                <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" /> Top Pros Nearby
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-neutral-100 rounded-full"></div>
                      <div>
                        <p className="font-bold text-sm text-neutral-800">Sarah K.</p>
                        <p className="text-xs text-neutral-500">Cleaner • Westlands</p>
                      </div>
                      <Button size="icon" variant="ghost" className="ml-auto text-neutral-400 hover:text-primary"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // PUBLIC LANDING PAGE VIEW (Guest)
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-white to-white -z-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live in Nairobi, Kiambu & Machakos
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Trusted Pros for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Every Task.</span>
          </h1>

          <p className="text-xl text-neutral-500 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            From leaking taps to full home renovations. Connect with vetted, local experts in minutes. Safe, reliable, and insured.
          </p>

          {/* New Gateway Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Link href="/register?type=consumer">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                I Need a Service
              </Button>
            </Link>
            <Link href="/register?type=provider">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-neutral-50 transition-all hover:-translate-y-1">
                I Offer Services
              </Button>
            </Link>
          </div>

          {/* Stats / Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-neutral-100 pt-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="text-center">
              <div className="flex justify-center mb-2 text-primary"><Shield className="h-6 w-6" /></div>
              <div className="font-bold text-2xl text-neutral-900">100%</div>
              <div className="text-sm text-neutral-500">Vetted Pros</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2 text-primary"><Clock className="h-6 w-6" /></div>
              <div className="font-bold text-2xl text-neutral-900">1hr</div>
              <div className="text-sm text-neutral-500">Avg. Response</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2 text-primary"><CheckCircle className="h-6 w-6" /></div>
              <div className="font-bold text-2xl text-neutral-900">5k+</div>
              <div className="text-sm text-neutral-500">Jobs Done</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2 text-primary"><Search className="h-6 w-6" /></div>
              <div className="font-bold text-2xl text-neutral-900">50+</div>
              <div className="text-sm text-neutral-500">Service Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services (Brief) */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Popular Services</h2>
              <p className="text-neutral-500 max-w-xl">Most requested services in your area this week.</p>
            </div>
            <Button variant="link" className="text-primary hidden md:flex">View all categories &rarr;</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Plumbing', 'Electrical', 'Cleaning', 'Moving'].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-12 w-12 bg-green-50 rounded-xl mb-4 flex items-center justify-center text-2xl">
                  {i === 0 ? '💧' : i === 1 ? '⚡' : i === 2 ? '✨' : '🚚'}
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-1">{service}</h3>
                <p className="text-sm text-neutral-500">Starting at KES 500</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/50 skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-slate-300 mb-10 text-lg max-w-2xl mx-auto">Join thousands of Kenyans finding trusted help and growing their businesses on MtaaTrust.</p>
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-emerald-500 text-white h-14 px-10 rounded-full font-bold text-lg">Create Free Account</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
