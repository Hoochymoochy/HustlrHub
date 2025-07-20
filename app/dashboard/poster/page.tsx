"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Eye,
  CheckCircle,
  Briefcase,
  TrendingUp,
  Zap,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PosterDashboard() {
  const [userName, setUserName] = useState("")
  const [userProfile, setUserProfile] = useState<any>(null)
  const [verificationStatus, setVerificationStatus] = useState("not_verified")
  const [postedJobs, setPostedJobs] = useState<any[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Job Poster"
    const profile = JSON.parse(localStorage.getItem("userProfile") || "{}")
    const status = localStorage.getItem("verificationStatus") || "not_verified"
    const jobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")

    setUserName(name)
    setUserProfile(profile)
    setVerificationStatus(status)
    setPostedJobs(jobs)

    // Check if just posted a job
    if (searchParams?.get("posted") === "true") {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [searchParams])

  const getVerificationBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="verification-badge text-green-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            Verified ✅
          </Badge>
        )
      default:
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Not Verified</Badge>
    }
  }

  const activeJobs = postedJobs.filter((job) => job.status === "active")
  const completedJobs = postedJobs.filter((job) => job.status === "completed")

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
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Job Poster</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/jobs/post">
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                disabled={verificationStatus === "not_verified"}
              >
                <Plus className="h-4 w-4 mr-2" />
                {verificationStatus === "not_verified" ? "Verify to Post" : "Post Job"}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-green-400">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {getVerificationBadge()}
              <Avatar className="cursor-pointer" onClick={() => (window.location.href = "/profile")}>
                <AvatarImage src={userProfile?.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-green-500/20 text-green-400">
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
        {/* Success Message */}
        {showSuccessMessage && (
          <Card className="bg-green-500/10 border-green-500/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Job Posted Successfully! 🎉</p>
                  <p className="text-slate-400 text-sm">Your job is now live and visible to verified teens.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
            Welcome back, {userName.split(" ")[0]}! 💼
          </h1>
          <p className="text-slate-300 text-lg">Connect with verified teen workers for your tasks</p>
          {userProfile?.companyName && (
            <p className="text-slate-400">
              {userProfile.companyName} • {userProfile.businessType}
            </p>
          )}
        </div>

        {/* Verification Status */}
        {verificationStatus === "not_verified" && (
          <Card className="bg-red-500/10 border-red-500/20 mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Verification Required</p>
                  <p className="text-slate-400 text-sm">
                    Complete identity verification to post jobs and hire verified teens.
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
                  <p className="text-slate-400 text-sm">Active Jobs</p>
                  <p className="text-2xl font-bold text-green-400">{activeJobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    {postedJobs.reduce((sum, job) => sum + (job.applicants || 0), 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Completed Jobs</p>
                  <p className="text-2xl font-bold text-purple-400">{completedJobs.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {postedJobs.length > 0 ? Math.round((completedJobs.length / postedJobs.length) * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Management */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Active Jobs ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Completed ({completedJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeJobs.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">No Active Jobs</h3>
                  <p className="text-slate-400 mb-4">Post your first job to get started!</p>
                  <Link href="/jobs/post">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              activeJobs.map((job) => (
                <Card key={job.id} className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-100">{job.title}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                          {job.urgent && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>}
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
                            <DollarSign className="h-4 w-4" />${job.pay} {job.payType === "hourly" ? "/hr" : ""}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.applicants || 0} applicants
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedJobs.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">No Completed Jobs Yet</h3>
                  <p className="text-slate-400">Completed jobs will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              completedJobs.map((job) => (
                <Card key={job.id} className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-100">{job.title}</h3>
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Completed</Badge>
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
                            <DollarSign className="h-4 w-4" />${job.pay} {job.payType === "hourly" ? "/hr" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
