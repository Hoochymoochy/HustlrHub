"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Shield, CheckCircle, AlertTriangle, Zap } from "lucide-react"
import Link from "next/link"

// Mock job data
const jobData = {
  id: 1,
  title: "Dog Walking",
  description:
    "Walk my golden retriever for 30 minutes around the neighborhood. She's very friendly and well-behaved. Please bring water for her if it's a hot day.",
  location: "Downtown Park Area",
  pay: 15,
  duration: "30 min",
  category: "Pet Care",
  poster: {
    name: "Sarah M.",
    rating: 4.8,
    jobsPosted: 12,
    avatar: "/placeholder-user.jpg",
  },
  requirements: ["Must love dogs", "Comfortable walking outdoors", "Available weekday afternoons"],
  urgent: false,
  postedAt: "2 hours ago",
  applicants: 3,
}

export default function JobDetailPage() {
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = () => {
    setHasApplied(true)
    // In a real app, this would submit the application
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/teen" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">TeenGigs</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{jobData.title}</h1>
                      {jobData.urgent && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>}
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {jobData.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-400">${jobData.pay}</p>
                    <p className="text-slate-400 text-sm">per job</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {jobData.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {jobData.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {jobData.applicants} applicants
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <h2 className="text-xl font-semibold text-slate-100 mb-3">Job Description</h2>
                  <p className="text-slate-300 leading-relaxed">{jobData.description}</p>
                </div>

                {jobData.requirements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100 mb-3">Requirements</h2>
                    <ul className="space-y-2">
                      {jobData.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-slate-200">Safety First</h3>
                  </div>
                  <p className="text-slate-400 text-sm">
                    All job posters are verified. Your parents will be notified and must approve before you can start
                    this job.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Poster Info */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100">Job Poster</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={jobData.poster.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-slate-700 text-slate-300">
                      {jobData.poster.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-100">{jobData.poster.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-slate-300 text-sm">{jobData.poster.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <p>{jobData.poster.jobsPosted} jobs posted</p>
                  <p>Posted {jobData.postedAt}</p>
                </div>
              </CardContent>
            </Card>

            {/* Apply Section */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                {!hasApplied ? (
                  <div className="space-y-4">
                    <Button
                      onClick={handleApply}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 neon-glow"
                    >
                      Apply for This Job
                    </Button>
                    {(() => {
                      const isMinor = localStorage.getItem("isMinor") === "true"
                      const controlLevel = localStorage.getItem("parentControlLevel") || "full"

                      if (!isMinor) {
                        return (
                          <p className="text-slate-400 text-sm text-center">
                            You can start this job immediately after applying.
                          </p>
                        )
                      }

                      return (
                        <div className="text-center space-y-2">
                          {controlLevel === "full" && (
                            <p className="text-slate-400 text-sm">
                              Your parent must approve before you can start this job.
                            </p>
                          )}
                          {controlLevel === "partial" && (
                            <p className="text-slate-400 text-sm">
                              Your parent will be notified, but you can start immediately.
                            </p>
                          )}
                          {controlLevel === "observer" && (
                            <p className="text-slate-400 text-sm">Your parent will receive updates on your progress.</p>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                    <div>
                      <p className="font-semibold text-green-400">Application Sent!</p>
                      {(() => {
                        const isMinor = localStorage.getItem("isMinor") === "true"
                        const controlLevel = localStorage.getItem("parentControlLevel") || "full"

                        if (!isMinor) {
                          return <p className="text-slate-400 text-sm">You can start working on this job now.</p>
                        }

                        if (controlLevel === "full") {
                          return <p className="text-slate-400 text-sm">Waiting for parent approval to start.</p>
                        } else {
                          return (
                            <p className="text-slate-400 text-sm">
                              Your parent has been notified. You can start working!
                            </p>
                          )
                        }
                      })()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Job Payment:</span>
                  <span className="text-slate-100 font-semibold">${jobData.pay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform Fee:</span>
                  <span className="text-slate-100">$0</span>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex justify-between">
                  <span className="text-slate-200 font-semibold">You'll Receive:</span>
                  <span className="text-green-400 font-bold">${jobData.pay}</span>
                </div>
                <p className="text-slate-400 text-xs">Payment processed securely after job completion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
