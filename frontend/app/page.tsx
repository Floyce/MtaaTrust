"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MapPin, Search, Star, Shield, CheckCircle, Clock, AlertCircle, Camera, Users, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { TypingText } from "@/components/typing-text"
import Link from "next/link"
import { api } from "@/lib/api"
import { EmergencySOSDialog } from "@/components/emergency-sos-dialog"

// Mock Data for Dashboard
const MOCK_BOOKINGS = [
  {
    id: "BK-7890",
    provider: "Juma's Electricals",
    service: "Electrical Repair",
    date: "Today, 2:00 PM",
    status: "confirmed",
    amount: "KES 1500",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juma"
  },
  {
    id: "BK-1234",
    provider: "Sparkle Clean Services",
    service: "Home Cleaning",
    date: "Sat, 28th Oct",
    status: "completed",
    amount: "KES 3000",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  }
]

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage directly for immediate feedback
    const userData = localStorage.getItem("user_data")
    if (userData) {
      setUser(JSON.parse(userData))
      fetchBookings()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchBookings() {
    try {
      const data = await api.get<any[]>("/bookings/")
      setBookings(data.length > 0 ? data : MOCK_BOOKINGS)
    } catch (error) {
      setBookings(MOCK_BOOKINGS)
    } finally {
      setLoading(false)
    }
  }

  // Animation Hooks for Guest View
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

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

          {/* Search Bar - Adding per request for 'Homepage Lite' feel */}
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Active Jobs & Activity */}
            <div className="lg:col-span-2 space-y-8">

              {/* Section 1: Active Jobs */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-neutral-800">Active Jobs</h2>
                </div>

                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'confirmed').map((booking) => (
                    <Card key={booking.id} className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-4">
                            <img src={booking.image} alt="Provider" className="h-12 w-12 rounded-full bg-neutral-100" />
                            <div>
                              <h3 className="font-bold text-neutral-900">{booking.service}</h3>
                              <p className="text-sm text-neutral-500">with {booking.provider}</p>
                              <div className="flex items-center gap-2 mt-2 text-sm text-green-700 bg-green-50 w-fit px-2 py-1 rounded">
                                <Clock className="h-4 w-4" />
                                {booking.date}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {bookings.filter(b => b.status === 'confirmed').length === 0 && (
                    <Card className="bg-neutral-50 border-dashed">
                      <CardContent className="p-8 text-center text-neutral-500">
                        <p>No active jobs right now.</p>
                        <Link href="/providers">
                          <Button className="mt-4 bg-green-600 hover:bg-green-700">Find a Pro</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </section>

              {/* Section 2: Recent Activity */}
              <section>
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Recent Activity</h2>
                <Card>
                  <CardContent className="p-0">
                    {[
                      { text: "Payment of KES 3,000 to Sparkle Clean", date: "2 days ago", icon: CreditCard, color: "text-blue-600 bg-blue-100" },
                      { text: "You rated Pete the Plumber 5 stars", date: "1 week ago", icon: CheckCircle2, color: "text-amber-600 bg-amber-100" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-neutral-50 transition-colors">
                        <div className={`p-2 rounded-full ${item.color}`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-neutral-900">{item.text}</p>
                          <p className="text-xs text-neutral-500">{item.date}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-300" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Right Column: Quick Actions */}
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-neutral-800 mb-4">Need Help?</h2>
                <div className="grid gap-4">
                  {/* SOS Button - Pulsating */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-red-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                    <div className="relative">
                      <QuickActionCard
                        icon={AlertCircle}
                        title="Emergency SOS"
                        desc="Immediate help for danger"
                        color="text-red-600 bg-red-50 hover:bg-red-100 border-red-200"
                        action={<EmergencySOSDialog />}
                      />
                    </div>
                  </div>
                  <Link href="/sambaza">
                    <QuickActionCard
                      icon={Users}
                      title="Group Booking"
                      desc="Save up to 30% with neighbors"
                      color="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                    />
                  </Link>
                  <Link href="/scan">
                    <QuickActionCard
                      icon={Camera}
                      title="Scan Problem"
                      desc="AI Diagnosis & Quote"
                      color="text-green-600 bg-green-50 hover:bg-green-100 border-green-200"
                    />
                  </Link>
                </div>
              </section>

              {/* Promo Card */}
              <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-none overflow-hidden relative">
                <CardContent className="p-6 relative z-10">
                  <h3 className="font-bold text-lg mb-2">Refer a Neighbor</h3>
                  <p className="text-amber-50 text-sm mb-4">Get KES 500 for every friend who books their first service.</p>
                  <Button variant="secondary" className="w-full text-amber-700 hover:text-amber-800 font-bold">Invite Friends</Button>
                </CardContent>
                <div className="absolute -right-6 -bottom-6 h-32 w-32 bg-white/20 rounded-full blur-2xl"></div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // GUEST LANDING PAGE
  // --------------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        {/* Abstract Background Shapes */}
        <motion.div
          style={{ y: y1, x: -50 }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"
        />
        <motion.div
          style={{ y: y2, x: 100 }}
          className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl -z-10"
        />

        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-primary tracking-tight leading-tight">
              Find Trusted Local Pros,<br />
              <span className="text-secondary inline-block min-w-[300px]">
                <TypingText texts={["Built on Community Trust", "Verified by Experts", "Available Instantly"]} />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl mb-10 text-text-secondary max-w-2xl mx-auto"
          >
            Connect with community-vetted plumbers, electricians, and technicians in Nairobi. Real trust scores, real reviews.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary/10 flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 relative group">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
              <Input
                placeholder="Suburb (e.g. Westlands, Kilimani)"
                className="pl-10 border-none bg-primary/5 h-12 focus-visible:ring-1 focus-visible:ring-primary rounded-xl transition-all"
              />
            </div>
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
              <Input
                placeholder="Service (e.g. Plumbing)"
                className="pl-10 border-none bg-primary/5 h-12 focus-visible:ring-1 focus-visible:ring-primary rounded-xl transition-all"
              />
            </div>
            <Link href="/providers">
              <Button size="lg" className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                Find a Pro
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories with Staggered Reveal */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Popular Categories</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
          >
            {['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Carpentry'].map((cat, i) => (
              <motion.div key={cat} variants={itemVariants}>
                <Card className="hover:shadow-2xl cursor-pointer transition-all hover:-translate-y-2 border-none shadow-md bg-slate-50 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="flex flex-col items-center justify-center p-6 h-32 relative z-10">
                    {/* Replace with actual icons later */}
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl text-primary">
                        {['🚿', '⚡', '🎨', '🧹', '🔨'][i]}
                      </span>
                    </div>
                    <span className="font-semibold text-text-primary group-hover:text-primary transition-colors">{cat}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works - Scroll Triggered */}
      <section id="how-it-works" className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">How MtaaTrust Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Search", desc: "Find pros in your specific suburb.", icon: Search, color: "bg-blue-100 text-blue-600" },
              { title: "Verify", desc: "Check community trust scores & reviews.", icon: Shield, color: "bg-emerald-100 text-emerald-600" },
              { title: "Book", desc: "Securely book & pay via M-Pesa.", icon: CheckCircle, color: "bg-amber-100 text-amber-600" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="text-center px-6 relative"
              >
                {/* Connecting lines for desktop */}
                {i !== 2 && (
                  <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-slate-200" />
                )}
                <div className={`w-20 h-20 ${step.color} rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg hover:rotate-6 transition-transform duration-300`}>
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-primary">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers - 3D Hover Effect */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Top Rated</span>
              <h2 className="text-3xl font-bold text-text-primary">Community-Vetted Pros</h2>
            </div>
            <Link href="/providers">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/5 font-semibold">View All</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 perspective-1000">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
                className="transform-style-3d cursor-pointer"
              >
                <Card className="overflow-hidden border-none shadow-lg h-full bg-white">
                  <div className="h-44 bg-slate-900 w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-slate-900 uppercase tracking-wide">
                        {['Plumber', 'Electrician', 'Carpenter'][i - 1]}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors">
                          {['John Kamau', 'Sarah Wanjiku', 'David Omondi'][i - 1]}
                        </h3>
                        <p className="text-sm text-text-secondary flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {['Kilimani', 'Westlands', 'Karen'][i - 1]}
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                        <Shield className="h-3 w-3" /> VERIFIED
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg">
                      <div className="flex items-center text-secondary">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold ml-1 text-slate-900">4.{9 - i}</span>
                      </div>
                      <span className="text-xs text-text-secondary pb-0.5">• 1{i}2 reviews</span>
                    </div>

                    <div className="space-y-3 text-sm text-text-secondary mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>98% Rehire Rate</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Responds in &lt; 30 mins</span>
                      </div>
                    </div>

                    <Link href={`/providers/${i}`}>
                      <Button className="w-full bg-slate-900 text-white hover:bg-primary transition-colors">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary skew-y-3 transform origin-bottom-right scale-110"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join the MtaaTrust Community</h2>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-xl">
              Build your reputation and get hired by reliability, not just lowest price.
              <br />Instant payments via M-Pesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register?type=provider">
                <Button size="lg" variant="secondary" className="px-8 font-bold text-lg h-14 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                  List Your Service
                </Button>
              </Link>
              <Link href="/register?type=consumer">
                <Button size="lg" className="px-8 font-bold text-lg h-14 bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20">
                  I Need a Pro
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary text-white p-1 rounded">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-white font-bold text-xl">MtaaTrust</h3>
              </div>
              <p className="text-sm leading-relaxed">
                Building trust in Kenyan local services through verification, community reviews, and secure payments.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">Browse Pros</li>
                <li className="hover:text-primary cursor-pointer transition-colors">How it Works</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Mtaa Scan AI <span className="text-[10px] bg-secondary text-white px-1 rounded ml-1">NEW</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Trust & Safety</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  support@mtaatrust.co.ke
                </li>
                <li>+254 700 000 000</li>
                <li className="mt-4">
                  <div className="flex gap-4">
                    {/* Social Icons Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">X</div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">In</div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">Ig</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 mt-16 pt-8 text-center text-sm flex justify-between items-center flex-col md:flex-row gap-4">
            <p>© 2026 MtaaTrust. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <span className="text-red-500">♥</span> in Nairobi
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function QuickActionCard({ icon: Icon, title, desc, color, action }: any) {
  if (action) {
    return (
      <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${color}`}>
        <div className="bg-white/80 p-2.5 rounded-lg shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs opacity-80">{desc}</p>
        </div>
        {action}
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${color}`}>
      <div className="bg-white/80 p-2.5 rounded-lg shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold">{title}</h3>
        <p className="text-xs opacity-80">{desc}</p>
      </div>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </div>
  )
}
