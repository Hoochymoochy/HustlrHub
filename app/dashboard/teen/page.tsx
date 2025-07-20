"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Filter,
  Briefcase,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

const mockJobs = [
  {
    id: 1,
    title: "Dog Walking",
    description: "Walk my golden retriever for 30 minutes",
    location: "Downtown",
    pay: 15,
    duration: "30 min",
    poster: "Sarah M.",
    rating: 4.8,
    urgent: false,
    category: "Pet Care",
    verified: true,
  },
  {
    id: 2,
    title: "Lawn Mowing",
    description: "Mow front and back yard, small property",
    location: "Suburbs",
    pay: 25,
    duration: "1 hour",
    poster: "Mike R.",
    rating: 4.9,
    urgent: true,
    category: "Yard Work",
    verified: true,
  },
  {
    id: 3,
    title: "Grocery Shopping",
    description: "Pick up groceries from local store",
    location: "Near Mall",
    pay: 20,
    duration: "45 min",
    poster: "Emma L.",
    rating: 4.7,
    urgent: false,
    category: "Errands",
    verified: true,
  },
]

export default function TeenDashboard() {
  const [userName, setUserName] = useState("")
  const [verificationStatus, setVerificationStatus] = useState("not_verified")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Teen User"
    const status = localStorage.getItem("verificationStatus") || "not_verified"
    setUserName(name)
    setVerificationStatus(status)
  }, [])

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="verification-badge text-green-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified ✅
          </Badge>
        )
      case "parent_verified":
        return (
          <Badge className="verification-badge text-blue-400">
            <Shield className="h-4 w-4 mr-1" />
            Parent Verified ✅
          </Badge>
        )
      default:
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Not Verified</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span className="text-xl font-bold neon-text">HustlrHub</span>
            </Link>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Teen Hustler</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-cyan-400">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {getVerificationBadge()}
              <Avatar className="cursor-pointer" onClick={() => (window.location.href = "/profile")}>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-cyan-500/20 text-cyan-400">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
            Welcome back, {userName.split(" ")[0]}! 🚀
          </h1>
          <p className="text-slate-300 text-lg">Ready to hustle and earn today?</p>
        </div>

        {/* Verification Status */}
        {verificationStatus === "not_verified" && (
          <Card className="bg-red-500/10 border-red-500/20 mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-400" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Verification Required</p>
                  <p className="text-slate-400 text-sm">
                    Complete verification to access all jobs and build trust with employers.
                  </p>
                </div>
                <Link href="/auth/verify">
                  <Button className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30">
                    Verify Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Earned</p>
                  <p className="text-2xl font-bold text-green-400">$247</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Jobs Completed</p>
                  <p className="text-2xl font-bold text-cyan-400">12</p>
                </div>
                <Briefcase className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Rating</p>
                  <p className="text-2xl font-bold text-yellow-400">4.9</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">This Week</p>
                  <p className="text-2xl font-bold text-purple-400">3</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search verified jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100"
            />
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-cyan-400 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Available Jobs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100">Verified Jobs Available</h2>
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-100">{job.title}</h3>
                        {job.urgent && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>}
                        {job.verified && (
                          <Badge className="verification-badge text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {job.category}
                        </Badge>
                      </div>
                      <p className="text-slate-300 mb-3">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {job.rating} • {job.poster}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">${job.pay}</p>
                        <p className="text-slate-400 text-sm">per job</p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                        disabled={verificationStatus === "not_verified"}
                      >
                        {verificationStatus === "not_verified" ? "Verify to Apply" : "Apply Now"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
