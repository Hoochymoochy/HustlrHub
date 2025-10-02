"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Users, DollarSign, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LandingPage() {
  const [isOpenForm, setIsOpenForm] = useState(false)

  function openForm() {
    setIsOpenForm(true)
  }

  function closeForm() {
    setIsOpenForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold neon-text">LADINT</span>
          </div>
          <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 neon-glow" onClick={openForm}>
                Join the Club
              </Button>
          </div>
        </div>
      </header>

      {isOpenForm && (
        <div
          className="fixed top-0 left-0 w-full max-w-md h-full bg-black bg-opacity-80 backdrop-blur-md z-50 overflow-x-hidden overflow-y-hidden">
          <div className="container mx-auto py-4 px-4">
            <div className="bg-white rounded-lg shadow-box border border-slate-300">
              <div className="px-6 py-8">
                <CardTitle className="text-xl font-bold text-slate-800">
                  Become a Member
                </CardTitle>
                <p className="mt-4 text-sm text-gray-500">
                  Join our community and connect with like-minded hustlers.
                </p>
                <div className="mt-6">
                  <input
                    className="bg-yellow-100 border border-yellow-500 rounded-md py-2 px-3 mb-3"
                    placeholder="Email Address"
                    type="email"
                  />
                  <input
                    className="bg-yellow-100 border border-yellow-500 rounded-md py-2 px-3 mb-3"
                    placeholder="Whatsapp Number"
                    type="tel"
                  />
                  <Button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
      }
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
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
