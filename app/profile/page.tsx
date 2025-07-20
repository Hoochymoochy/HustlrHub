"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  MapPin,
  Briefcase,
  Star,
  Edit,
  Zap,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Building,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const [verificationStatus, setVerificationStatus] = useState("")
  const [userProfile, setUserProfile] = useState<any>({})

  useEffect(() => {
    const role = localStorage.getItem("userRole") || ""
    const name = localStorage.getItem("userName") || ""
    const status = localStorage.getItem("verificationStatus") || ""
    const profile = JSON.parse(localStorage.getItem("userProfile") || "{}")

    setUserRole(role)
    setUserName(name)
    setVerificationStatus(status)
    setUserProfile(profile)
  }, [])

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

  const getRoleColor = () => {
    switch (userRole) {
      case "teen":
        return "cyan"
      case "parent":
        return "purple"
      case "poster":
        return "green"
      default:
        return "cyan"
    }
  }

  const getRoleTitle = () => {
    switch (userRole) {
      case "teen":
        return "Teen Hustler"
      case "parent":
        return "Parent"
      case "poster":
        return "Job Poster"
      default:
        return "User"
    }
  }

  const getDashboardLink = () => {
    switch (userRole) {
      case "teen":
        return "/dashboard/teen"
      case "parent":
        return "/dashboard/parent"
      case "poster":
        return "/dashboard/poster"
      default:
        return "/dashboard/teen"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={getDashboardLink()} className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">HustlrHub</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={userProfile?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className={`bg-${getRoleColor()}-500/20 text-${getRoleColor()}-400 text-2xl`}>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <h1 className="text-2xl font-bold text-slate-100 mb-2">{userName}</h1>

                <div className="flex flex-col items-center gap-2 mb-4">
                  <Badge
                    className={`bg-${getRoleColor()}-500/20 text-${getRoleColor()}-400 border-${getRoleColor()}-500/30`}
                  >
                    {getRoleTitle()}
                  </Badge>
                  {getVerificationBadge()}
                </div>

                {userProfile?.location && (
                  <div className="flex items-center justify-center gap-2 text-slate-400 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                )}

                <Button
                  onClick={() => (window.location.href = "/onboarding/profile")}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {userRole === "teen" && (
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-slate-300">Hourly Rate</span>
                    </div>
                    <span className="text-slate-100 font-semibold">${userProfile?.hourlyRate || "Not set"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-slate-300">Rating</span>
                    </div>
                    <span className="text-slate-100 font-semibold">4.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-cyan-400" />
                      <span className="text-slate-300">Jobs Done</span>
                    </div>
                    <span className="text-slate-100 font-semibold">12</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {userProfile?.bio && (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-400" />
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{userProfile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Teen-specific sections */}
            {userRole === "teen" && (
              <>
                {/* Skills */}
                {userProfile?.skills?.length > 0 && (
                  <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Star className="h-5 w-5 text-cyan-400" />
                        Skills & Services
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill: string) => (
                          <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Availability */}
                {userProfile?.availability?.length > 0 && (
                  <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-cyan-400" />
                        Availability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {userProfile.availability.map((time: string) => (
                          <div key={time} className="flex items-center gap-2 text-slate-300">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span>{time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Education */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-cyan-400" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {userProfile?.grade && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Grade</span>
                        <span className="text-slate-100">{userProfile.grade}</span>
                      </div>
                    )}
                    {userProfile?.school && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">School</span>
                        <span className="text-slate-100">{userProfile.school}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Job Poster-specific sections */}
            {userRole === "poster" && (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-400" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile?.companyName && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Company</span>
                      <span className="text-slate-100">{userProfile.companyName}</span>
                    </div>
                  )}
                  {userProfile?.businessType && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Business Type</span>
                      <span className="text-slate-100 capitalize">{userProfile.businessType.replace("-", " ")}</span>
                    </div>
                  )}
                  {userProfile?.yearsInBusiness && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Years Active</span>
                      <span className="text-slate-100">{userProfile.yearsInBusiness} years</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Parent-specific sections */}
            {userRole === "parent" && (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Parent Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile?.occupation && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Occupation</span>
                      <span className="text-slate-100">{userProfile.occupation}</span>
                    </div>
                  )}
                  {userProfile?.emergencyContact && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Emergency Contact</span>
                      <span className="text-slate-100">{userProfile.emergencyContact}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {userProfile?.experience && (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-cyan-400" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{userProfile.experience}</p>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-cyan-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300">Available through HustlrHub messaging</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-slate-300">Identity verified for secure communication</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
