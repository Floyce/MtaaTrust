import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MapPin, Search, Star, Shield, CheckCircle, Clock } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary pt-16 pb-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Trusted Local Pros, Not Just Recommendations
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Connect with community-vetted plumbers, electricians, and more in Nairobi. Real reviews, real trust.
          </p>

          <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Suburb (e.g. Westlands, Kilimani)" className="pl-10 border-none bg-gray-50 h-11" />
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Service (e.g. Plumbing)" className="pl-10 border-none bg-gray-50 h-11" />
            </div>
            <Button size="lg" className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white font-semibold">
              Find a Pro
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Carpentry'].map((cat) => (
              <Card key={cat} className="hover:shadow-md cursor-pointer transition-shadow border-gray-100 bg-slate-50">
                <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                  {/* Icons would go here */}
                  <span className="font-semibold text-text-primary">{cat}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">How MtaaTrust Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Search", desc: "Find pros in your specific suburb.", icon: Search },
              { title: "Verify", desc: "Check community trust scores & reviews.", icon: Shield },
              { title: "Book", desc: "Securely book & pay via M-Pesa.", icon: CheckCircle }
            ].map((step, i) => (
              <div key={i} className="text-center px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Community-Vetted Pros</h2>
            <Button variant="link" className="text-primary font-semibold">View All</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gray-200 w-full" /> {/* Placeholder for image */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">May Linda</h3>
                      <p className="text-sm text-text-secondary">Plumber • Kilimani</p>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                      <Shield className="h-3 w-3" /> Verified
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold ml-1 text-text-primary">4.8</span>
                    </div>
                    <span className="text-xs text-text-secondary">(120 reviews)</span>
                  </div>

                  <div className="space-y-2 text-sm text-text-secondary mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>98% Rehire Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Responds in &lt; 1 hr</span>
                    </div>
                  </div>

                  <Button className="w-full">View Profile</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Are you a Skilled Professional?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join MtaaTrust to build your reputation and get hired by reliability, not just lowest price.
          </p>
          <Button size="lg" variant="default">List Your Service</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">MtaaTrust</h3>
              <p className="text-sm">Building trust in Kenyan local services.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>Browse Pros</li>
                <li>How it Works</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@mtaatrust.co.ke</li>
                <li>+254 720538273</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            © 2025 MtaaTrust. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
