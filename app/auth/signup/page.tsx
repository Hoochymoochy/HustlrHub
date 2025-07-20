"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Shield, Briefcase, Zap, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [role, setRole] = useState("")
  const [age, setAge] = useState<number | null>(null)
  const [isMinor, setIsMinor] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
  })
  const router = useRouter()

  const calculateAge = (birthday: string) => {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const handleBirthdayChange = (birthday: string) => {
    setFormData({ ...formData, birthday })
    if (birthday) {
      const calculatedAge = calculateAge(birthday)
      setAge(calculatedAge)
      setIsMinor(calculatedAge < 18)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Store user data
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`)
    localStorage.setItem("userAge", age?.toString() || "")
    localStorage.setItem("isMinor", isMinor.toString())
    localStorage.setItem("verificationStatus", "not_verified")

    // Redirect to verification flow
    router.push("/auth/verify")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <ArrowLeft className="h-4 w-4 text-slate-400" />
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">HustlrHub</span>
          </Link>
          <CardTitle className="text-2xl text-slate-100">Create Account</CardTitle>
          <CardDescription className="text-slate-300">Join the verified hustle community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-slate-200">Choose your role</Label>
              <RadioGroup value={role} onValueChange={setRole} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-colors">
                  <RadioGroupItem value="teen" id="teen" />
                  <Users className="h-5 w-5 text-cyan-400" />
                  <Label htmlFor="teen" className="text-slate-200 cursor-pointer flex-1">
                    Teen Hustler
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                  <RadioGroupItem value="parent" id="parent" />
                  <Shield className="h-5 w-5 text-purple-400" />
                  <Label htmlFor="parent" className="text-slate-200 cursor-pointer flex-1">
                    Parent
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700/50 hover:border-green-500/50 transition-colors">
                  <RadioGroupItem value="poster" id="poster" />
                  <Briefcase className="h-5 w-5 text-green-400" />
                  <Label htmlFor="poster" className="text-slate-200 cursor-pointer flex-1">
                    Job Poster
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-200">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-slate-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-200">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-slate-100"
                required
              />
            </div>

            {/* Birthday field for teens and job posters */}
            {(role === "teen" || role === "poster") && (
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-slate-200 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Birthday
                </Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleBirthdayChange(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-slate-100"
                  required
                />
                {age !== null && (
                  <div className="flex items-center gap-2 mt-2">
                    {isMinor ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Under 18 - Parent verification required
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        18+ - Identity verification required
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-200">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-slate-100"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-slate-300">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 neon-glow"
              disabled={!role}
            >
              Create Account
            </Button>

            <div className="text-center">
              <span className="text-slate-400">Already have an account? </span>
              <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
