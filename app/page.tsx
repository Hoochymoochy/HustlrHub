import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, DollarSign, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold neon-text">HustlrHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-cyan-400">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 neon-glow">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">🔒 Verified & Safe</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Safe Hustles
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            The verified platform connecting teens with safe local microjobs. Identity-verified users, parental
            oversight, secure payments.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 py-4 neon-glow"
            >
              Start Hustling <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 px-4 bg-slate-800/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">Built for Safety</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-100">Identity Verified</h3>
              <p className="text-slate-300">All users verified through Stripe Identity for maximum trust</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-100">Parent Approved</h3>
              <p className="text-slate-300">Teens under 18 require parent verification and oversight</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-100">Secure Payments</h3>
              <p className="text-slate-300">Protected transactions with instant payouts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">Choose Your Role</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:neon-glow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-cyan-400">Teen Hustler</CardTitle>
                <CardDescription className="text-slate-300">Find verified gigs that fit your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-cyan-400" /> Identity verified
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-cyan-400" /> Flexible hours
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-cyan-400" /> Instant payouts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:neon-glow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-purple-400">Parent</CardTitle>
                <CardDescription className="text-slate-300">Monitor and approve your teen's activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-purple-400" /> Full oversight
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-purple-400" /> Verified jobs only
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-400" /> Real-time updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:neon-glow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-green-400">Job Poster</CardTitle>
                <CardDescription className="text-slate-300">Find verified teen workers for your tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Verified teens only
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-400" /> Background checked
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-400" /> Quick matching
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-4">
        <div className="container mx-auto text-center text-slate-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold text-slate-100">HustlrHub</span>
          </div>
          <p>&copy; 2024 HustlrHub. Safe hustles for the next generation.</p>
        </div>
      </footer>
    </div>
  )
}
