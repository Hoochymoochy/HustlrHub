"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Clock, Mail, ArrowRight, Zap, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Placeholder function for Stripe Identity verification
// TODO: Replace with actual Stripe API call
const createStripeVerificationSession = async (userId: string) => {
  console.log("🔧 DEVELOPER NOTE: Replace this with actual Stripe API call")
  console.log("Backend call needed: stripe.identity.verificationSessions.create({")
  console.log("  type: 'document',")
  console.log("  metadata: { user_id: userId },")
  console.log("  options: {")
  console.log("    document: { require_matching_selfie: true }")
  console.log("  }")
  console.log("})")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Return mock verification session
  return {
    id: "vs_" + Math.random().toString(36).substr(2, 9),
    url: "https://verify.stripe.com/start/test_session_" + Math.random().toString(36).substr(2, 9),
  }
}

const sendParentApprovalEmail = async (parentEmail: string, teenName: string) => {
  console.log("📧 Sending parent approval email to:", parentEmail)
  console.log("Teen name:", teenName)

  // Simulate email sending
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    approvalLink: `https://hustlrhub.com/parent/approve/${Math.random().toString(36).substr(2, 9)}`,
  }
}

export default function VerifyPage() {
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const [isMinor, setIsMinor] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState("not_verified")
  const [isLoading, setIsLoading] = useState(false)
  const [parentEmail, setParentEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole") || ""
    const name = localStorage.getItem("userName") || ""
    const minor = localStorage.getItem("isMinor") === "true"
    const status = localStorage.getItem("verificationStatus") || "not_verified"

    setUserRole(role)
    setUserName(name)
    setIsMinor(minor)
    setVerificationStatus(status)
  }, [])

  const handleStripeVerification = async () => {
    setIsLoading(true)
    setVerificationStatus("in_progress")
    localStorage.setItem("verificationStatus", "in_progress")

    try {
      // Create Stripe verification session
      const session = await createStripeVerificationSession("user_123")

      // In a real app, redirect to Stripe verification page
      console.log("Redirecting to Stripe verification:", session.url)

      // Simulate verification completion after 3 seconds
      setTimeout(() => {
        setVerificationStatus("verified")
        localStorage.setItem("verificationStatus", "verified")
        setIsLoading(false)
      }, 3000)
    } catch (error) {
      console.error("Verification failed:", error)
      setVerificationStatus("not_verified")
      localStorage.setItem("verificationStatus", "not_verified")
      setIsLoading(false)
    }
  }

  const handleParentApproval = async () => {
    if (!parentEmail) return

    setIsLoading(true)

    try {
      const result = await sendParentApprovalEmail(parentEmail, userName)

      if (result.success) {
        setEmailSent(true)
        setVerificationStatus("in_progress")
        localStorage.setItem("verificationStatus", "in_progress")
        localStorage.setItem("parentEmail", parentEmail)

        // Simulate parent approval after 5 seconds
        setTimeout(() => {
          setVerificationStatus("parent_verified")
          localStorage.setItem("verificationStatus", "parent_verified")
          setIsLoading(false)
        }, 5000)
      }
    } catch (error) {
      console.error("Failed to send parent email:", error)
      setIsLoading(false)
    }
  }

  const proceedToDashboard = () => {
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
      case "in_progress":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="h-4 w-4 mr-1" />
            Verification In Progress
          </Badge>
        )
      default:
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="h-4 w-4 mr-1" />
            Not Verified
          </Badge>
        )
    }
  }

  // Skip verification for parents
  if (userRole === "parent") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span className="text-xl font-bold neon-text">HustlrHub</span>
            </div>
            <CardTitle className="text-2xl text-slate-100">Welcome, {userName}!</CardTitle>
            <CardDescription className="text-slate-300">Your parent account is ready to use</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-6 bg-slate-700/30 rounded-lg">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Parent Account Active</h3>
              <p className="text-slate-300 text-sm">
                As a parent, you can monitor and approve your teen's job activities without additional verification.
              </p>
            </div>

            <Button
              onClick={proceedToDashboard}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 neon-glow"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl font-bold neon-text">HustlrHub</span>
          </div>
          <CardTitle className="text-2xl text-slate-100">Verify Your Identity</CardTitle>
          <CardDescription className="text-slate-300">
            Verify your identity to gain full access and build trust within the HustlrHub community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-2">Current Status:</p>
            {getVerificationBadge()}
          </div>

          {/* Verification Complete */}
          {(verificationStatus === "verified" || verificationStatus === "parent_verified") && (
            <div className="text-center space-y-4">
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  {verificationStatus === "parent_verified" ? "Parent Approved!" : "Verification Complete!"}
                </h3>
                <p className="text-slate-300 text-sm">
                  {verificationStatus === "parent_verified"
                    ? "Your parent has approved your account. You can now access all features safely."
                    : "Your identity has been verified. You can now access all features and build trust with the community."}
                </p>
              </div>

              <Button
                onClick={() => router.push("/onboarding/profile")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 neon-glow"
              >
                Complete Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* In Progress */}
          {verificationStatus === "in_progress" && (
            <div className="text-center space-y-4">
              <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <Loader2 className="h-12 w-12 text-yellow-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                  {isMinor ? "Waiting for Parent Approval" : "Verification In Progress"}
                </h3>
                <p className="text-slate-300 text-sm">
                  {isMinor
                    ? "We've sent an approval request to your parent. Please wait for them to approve your account."
                    : "Please complete the verification process. This may take a few moments."}
                </p>
              </div>
            </div>
          )}

          {/* Not Verified - Minor */}
          {verificationStatus === "not_verified" && isMinor && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <h3 className="font-semibold text-blue-400">Parent Verification Required</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Since you're under 18, we need your parent to approve your account for safety.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentEmail" className="text-slate-200 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Parent's Email
                </Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="bg-slate-700/50 border-slate-600 text-slate-100"
                  disabled={emailSent || isLoading}
                />
              </div>

              <Button
                onClick={handleParentApproval}
                disabled={!parentEmail || emailSent || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 neon-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : emailSent ? (
                  "Email Sent!"
                ) : (
                  "Send Parent Approval"
                )}
              </Button>
            </div>
          )}

          {/* Not Verified - Adult */}
          {verificationStatus === "not_verified" && !isMinor && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-400">Identity Verification</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  We use Stripe Identity to verify your identity securely. This helps build trust in our community.
                </p>
              </div>

              <Button
                onClick={handleStripeVerification}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 neon-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting Verification...
                  </>
                ) : (
                  "Start Verification"
                )}
              </Button>
            </div>
          )}

          <div className="text-center">
            <Link href="/" className="text-slate-400 hover:text-cyan-400 text-sm">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
