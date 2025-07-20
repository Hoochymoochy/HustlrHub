"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Shield, CheckCircle, Zap, DollarSign, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

export default function ParentDashboard() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Parent User"
    setUserName(name)
  }, [])

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
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Parent</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-purple-400">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="cursor-pointer" onClick={() => (window.location.href = "/profile")}>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-purple-500/20 text-purple-400">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">Parent Dashboard 👨‍👩‍👧‍👦</h1>
          <p className="text-slate-300 text-lg">Monitor and manage your teen's verified job activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Teen's Earnings</p>
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
                <CheckCircle className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Pending Approval</p>
                  <p className="text-2xl font-bold text-yellow-400">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Safety Score</p>
                  <p className="text-2xl font-bold text-purple-400">A+</p>
                </div>
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teen Management */}
        <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Manage Teens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-cyan-500/20 text-cyan-400">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Alex Johnson</h3>
                  <p className="text-slate-400">Age 16 • Teen Hustler</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="verification-badge text-blue-400">
                      <Shield className="h-3 w-3 mr-1" />
                      Parent Verified ✅
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">$247 earned</p>
                <p className="text-slate-400 text-sm">12 jobs completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Features */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Safety Features Active
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Identity Verification</p>
                  <p className="text-slate-400 text-sm">All job posters verified via Stripe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-blue-400 font-medium">Parental Oversight</p>
                  <p className="text-slate-400 text-sm">Real-time job monitoring active</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-purple-400 font-medium">Secure Payments</p>
                  <p className="text-slate-400 text-sm">Protected transactions only</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-cyan-400 font-medium">Emergency Contacts</p>
                  <p className="text-slate-400 text-sm">Always accessible during jobs</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
