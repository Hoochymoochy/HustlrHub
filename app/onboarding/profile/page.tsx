"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  MapPin,
  Briefcase,
  Star,
  Camera,
  Zap,
  ArrowRight,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import { useRouter } from "next/navigation"

const skillOptions = [
  "Pet Care",
  "Yard Work",
  "Cleaning",
  "Tutoring",
  "Tech Help",
  "Errands",
  "Babysitting",
  "Moving Help",
  "Event Setup",
  "Photography",
]

const availabilityOptions = [
  "Weekday Mornings",
  "Weekday Afternoons",
  "Weekday Evenings",
  "Weekend Mornings",
  "Weekend Afternoons",
  "Weekend Evenings",
]

export default function ProfilePage() {
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const [verificationStatus, setVerificationStatus] = useState("")
  const [profileData, setProfileData] = useState({
    bio: "",
    location: "",
    hourlyRate: "",
    skills: [] as string[],
    availability: [] as string[],
    experience: "",
    profileImage: "",
    // Teen specific
    grade: "",
    school: "",
    parentContact: "",
    // Parent specific
    occupation: "",
    emergencyContact: "",
    // Job Poster specific
    companyName: "",
    businessType: "",
    yearsInBusiness: "",
  })
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole") || ""
    const name = localStorage.getItem("userName") || ""
    const status = localStorage.getItem("verificationStatus") || ""

    setUserRole(role)
    setUserName(name)
    setVerificationStatus(status)
  }, [])

  const handleSkillToggle = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleAvailabilityToggle = (time: string) => {
    setProfileData((prev) => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter((a) => a !== time)
        : [...prev.availability, time],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save profile data
    localStorage.setItem("userProfile", JSON.stringify(profileData))

    // Redirect to appropriate dashboard
    switch (userRole) {
      case "teen":
        router.push("/dashboard/teen")
        break
      case "parent":
        router.push("/dashboard/parent")
        break
      case "poster":
        router.push("/dashboard/poster")
        break
      default:
        router.push("/dashboard/teen")
    }
  }

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
        return null
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">HustlrHub</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.profileImage || "/placeholder.svg"} />
                <AvatarFallback className={`bg-${getRoleColor()}-500/20 text-${getRoleColor()}-400 text-2xl`}>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
            <CardTitle className="text-2xl text-slate-100">Complete Your Profile</CardTitle>
            <CardDescription className="text-slate-300">Tell the HustlrHub community about yourself</CardDescription>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge
                className={`bg-${getRoleColor()}-500/20 text-${getRoleColor()}-400 border-${getRoleColor()}-500/30`}
              >
                {getRoleTitle()}
              </Badge>
              {getVerificationBadge()}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                  <User className="h-5 w-5 text-cyan-400" />
                  Basic Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-200">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder={`Tell everyone about yourself as a ${getRoleTitle().toLowerCase()}...`}
                    className="bg-slate-700/50 border-slate-600 text-slate-100 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-200 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="City, State"
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    required
                  />
                </div>
              </div>

              {/* Teen-specific fields */}
              {userRole === "teen" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <Star className="h-5 w-5 text-cyan-400" />
                    Teen Profile
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade" className="text-slate-200">
                        Grade
                      </Label>
                      <Select
                        value={profileData.grade}
                        onValueChange={(value) => setProfileData({ ...profileData, grade: value })}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {Array.from({ length: 8 }, (_, i) => (
                            <SelectItem key={i} value={`${i + 9}`}>
                              {i + 9}th Grade
                            </SelectItem>
                          ))}
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="graduated">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate" className="text-slate-200 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Hourly Rate
                      </Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                        placeholder="15"
                        className="bg-slate-700/50 border-slate-600 text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-slate-200">
                      School
                    </Label>
                    <Input
                      id="school"
                      value={profileData.school}
                      onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                      placeholder="Your school name"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-200">Skills & Services</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={profileData.skills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={skill} className="text-slate-300 text-sm cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-200 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Availability
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      {availabilityOptions.map((time) => (
                        <div key={time} className="flex items-center space-x-2">
                          <Checkbox
                            id={time}
                            checked={profileData.availability.includes(time)}
                            onCheckedChange={() => handleAvailabilityToggle(time)}
                          />
                          <Label htmlFor={time} className="text-slate-300 text-sm cursor-pointer">
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Parent-specific fields */}
              {userRole === "parent" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    Parent Profile
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-slate-200">
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                      placeholder="Your profession"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="text-slate-200">
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                      placeholder="Backup contact person"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                </div>
              )}

              {/* Job Poster-specific fields */}
              {userRole === "poster" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-green-400" />
                    Business Profile
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-slate-200">
                      Company/Business Name
                    </Label>
                    <Input
                      id="companyName"
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                      placeholder="Your business name"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-slate-200">
                        Business Type
                      </Label>
                      <Select
                        value={profileData.businessType}
                        onValueChange={(value) => setProfileData({ ...profileData, businessType: value })}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="small-business">Small Business</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsInBusiness" className="text-slate-200">
                        Years Active
                      </Label>
                      <Input
                        id="yearsInBusiness"
                        type="number"
                        value={profileData.yearsInBusiness}
                        onChange={(e) => setProfileData({ ...profileData, yearsInBusiness: e.target.value })}
                        placeholder="5"
                        className="bg-slate-700/50 border-slate-600 text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Experience section for all roles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-100">Experience & Additional Info</h3>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-slate-200">
                    {userRole === "teen"
                      ? "Previous Work Experience"
                      : userRole === "parent"
                        ? "Why You Joined HustlrHub"
                        : "What Types of Jobs You'll Post"}
                  </Label>
                  <Textarea
                    id="experience"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    placeholder={
                      userRole === "teen"
                        ? "Describe any previous jobs, volunteer work, or relevant experience..."
                        : userRole === "parent"
                          ? "Tell us about your teen and why you're using HustlrHub..."
                          : "Describe the types of tasks you need help with..."
                    }
                    className="bg-slate-700/50 border-slate-600 text-slate-100 min-h-[100px]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full bg-gradient-to-r from-${getRoleColor()}-500 to-${getRoleColor() === "cyan" ? "purple" : getRoleColor() === "purple" ? "pink" : "emerald"}-500 hover:from-${getRoleColor()}-600 hover:to-${getRoleColor() === "cyan" ? "purple" : getRoleColor() === "purple" ? "pink" : "emerald"}-600 neon-glow`}
              >
                Complete Profile & Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
