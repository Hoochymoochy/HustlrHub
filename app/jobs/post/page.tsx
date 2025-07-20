"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, DollarSign, Clock, Zap, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    pay: "",
    payType: "fixed", // fixed or hourly
    duration: "",
    requirements: "",
    urgent: false,
    ageRange: "any", // 14-15, 16-17, 18+, any
    skillsNeeded: [] as string[],
    timeframe: "",
    contactMethod: "app", // app, phone, email
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.includes(skill)
        ? prev.skillsNeeded.filter((s) => s !== skill)
        : [...prev.skillsNeeded, skill],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save job to localStorage (in real app, this would be an API call)
    const existingJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]")
    const newJob = {
      id: Date.now(),
      ...formData,
      postedAt: new Date().toISOString(),
      status: "active",
      applicants: 0,
      poster: localStorage.getItem("userName") || "Anonymous",
    }

    localStorage.setItem("postedJobs", JSON.stringify([...existingJobs, newJob]))

    setIsSubmitting(false)
    router.push("/dashboard/poster?posted=true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/poster" className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">HustlrHub</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-100">Post a New Job</CardTitle>
            <CardDescription className="text-slate-300">
              Connect with verified teen workers for your tasks
            </CardDescription>
            <Badge className="verification-badge text-green-400 mx-auto w-fit">
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Poster
            </Badge>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Job Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2">Job Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-200">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Dog Walking, Lawn Mowing, Grocery Shopping"
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-200">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="pet-care">Pet Care</SelectItem>
                      <SelectItem value="yard-work">Yard Work</SelectItem>
                      <SelectItem value="errands">Errands</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="tutoring">Tutoring</SelectItem>
                      <SelectItem value="tech-help">Tech Help</SelectItem>
                      <SelectItem value="babysitting">Babysitting</SelectItem>
                      <SelectItem value="moving-help">Moving Help</SelectItem>
                      <SelectItem value="event-setup">Event Setup</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-200">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what needs to be done, any specific requirements, and what the teen should expect..."
                    className="bg-slate-700/50 border-slate-600 text-slate-100 min-h-[120px]"
                    required
                  />
                </div>
              </div>

              {/* Location & Timing */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2">
                  Location & Timing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-200 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Downtown, Suburbs, Near Mall"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-slate-200 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 1 hour, 2-3 hours, Half day"
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe" className="text-slate-200">
                    When do you need this done?
                  </Label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(value) => setFormData({ ...formData, timeframe: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="next-week">Next Week</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Payment */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2">Payment</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payType" className="text-slate-200">
                      Payment Type
                    </Label>
                    <Select
                      value={formData.payType}
                      onValueChange={(value) => setFormData({ ...formData, payType: value })}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pay" className="text-slate-200 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {formData.payType === "hourly" ? "Hourly Rate" : "Total Pay"} ($)
                    </Label>
                    <Input
                      id="pay"
                      type="number"
                      value={formData.pay}
                      onChange={(e) => setFormData({ ...formData, pay: e.target.value })}
                      placeholder={formData.payType === "hourly" ? "15" : "25"}
                      className="bg-slate-700/50 border-slate-600 text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2">
                  Requirements & Preferences
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="ageRange" className="text-slate-200">
                    Preferred Age Range
                  </Label>
                  <Select
                    value={formData.ageRange}
                    onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="any">Any Age</SelectItem>
                      <SelectItem value="14-15">14-15 years old</SelectItem>
                      <SelectItem value="16-17">16-17 years old</SelectItem>
                      <SelectItem value="18+">18+ years old</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-200">Skills Needed (Optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skillsNeeded.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-slate-300 text-sm cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-slate-200">
                    Additional Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Any specific skills, tools, experience, or other requirements..."
                    className="bg-slate-700/50 border-slate-600 text-slate-100"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2">Job Options</h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={formData.urgent}
                    onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked as boolean })}
                  />
                  <Label htmlFor="urgent" className="text-slate-300 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    Mark as urgent (will be highlighted to teens)
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMethod" className="text-slate-200">
                    Preferred Contact Method
                  </Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="app">Through HustlrHub App</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
                <h3 className="text-slate-200 font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Safety & Trust
                </h3>
                <div className="space-y-2 text-slate-400 text-sm">
                  <p>✅ All teen applicants are identity-verified or parent-approved</p>
                  <p>✅ Payment is processed securely through HustlrHub</p>
                  <p>✅ Parents are notified of all job activities for minors</p>
                  <p>✅ 24/7 support available for any issues</p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 neon-glow text-lg py-3"
              >
                {isSubmitting ? "Posting Job..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
