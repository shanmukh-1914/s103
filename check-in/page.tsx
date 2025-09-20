"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Heart, Smile, Meh, Sun, Cloud, CloudRain } from "lucide-react"
import Link from "next/link"

export default function CheckInPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({
    mood: null as number | null,
    energy: null as number | null,
    stress: null as number | null,
    sleep: null as number | null,
    gratitude: "",
    challenges: "",
    goals: "",
  })

  const steps = [
    {
      title: "How's your mood?",
      description: "Rate how you're feeling emotionally right now",
      type: "mood",
    },
    {
      title: "Energy level?",
      description: "How energetic do you feel today?",
      type: "energy",
    },
    {
      title: "Stress level?",
      description: "How stressed or overwhelmed do you feel?",
      type: "stress",
    },
    {
      title: "Sleep quality?",
      description: "How well did you sleep last night?",
      type: "sleep",
    },
    {
      title: "Gratitude",
      description: "What's one thing you're grateful for today?",
      type: "gratitude",
    },
    {
      title: "Challenges",
      description: "What's been challenging for you lately?",
      type: "challenges",
    },
    {
      title: "Today's goal",
      description: "What's one thing you want to accomplish today?",
      type: "goals",
    },
  ]

  const moodIcons = [
    { icon: CloudRain, label: "Very Low", color: "text-red-500" },
    { icon: Cloud, label: "Low", color: "text-orange-500" },
    { icon: Meh, label: "Okay", color: "text-yellow-500" },
    { icon: Smile, label: "Good", color: "text-green-500" },
    { icon: Sun, label: "Great", color: "text-blue-500" },
  ]

  const handleRatingSelect = (value: number, type: string) => {
    setResponses((prev) => ({ ...prev, [type]: value }))
  }

  const handleTextChange = (value: string, type: string) => {
    setResponses((prev) => ({ ...prev, [type]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitCheckIn = () => {
    // In a real app, this would save to a database
    console.log("Check-in submitted:", responses)
    // Redirect to dashboard with success message
    window.location.href = "/dashboard"
  }

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Daily Check-in</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
            <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Steps */}
            {["mood", "energy", "stress", "sleep"].includes(currentStepData.type) && (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const IconComponent = moodIcons[value - 1].icon
                    const isSelected = responses[currentStepData.type as keyof typeof responses] === value
                    return (
                      <button
                        key={value}
                        onClick={() => handleRatingSelect(value, currentStepData.type)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : "border-muted hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <IconComponent className={`h-8 w-8 mx-auto mb-2 ${moodIcons[value - 1].color}`} />
                        <div className="text-xs font-medium">{moodIcons[value - 1].label}</div>
                        <div className="text-xs text-muted-foreground">{value}</div>
                      </button>
                    )
                  })}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Tap to select your rating (1 = lowest, 5 = highest)</p>
                </div>
              </div>
            )}

            {/* Text Input Steps */}
            {["gratitude", "challenges", "goals"].includes(currentStepData.type) && (
              <div className="space-y-4">
                <Textarea
                  placeholder={
                    currentStepData.type === "gratitude"
                      ? "I'm grateful for..."
                      : currentStepData.type === "challenges"
                        ? "What's been difficult..."
                        : "Today I want to..."
                  }
                  value={responses[currentStepData.type as keyof typeof responses] as string}
                  onChange={(e) => handleTextChange(e.target.value, currentStepData.type)}
                  className="min-h-[120px]"
                />
                <p className="text-sm text-muted-foreground">Take your time - there's no rush.</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </Button>
              {isLastStep ? (
                <Button onClick={submitCheckIn} className="px-8">
                  Complete Check-in
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={
                    (["mood", "energy", "stress", "sleep"].includes(currentStepData.type) &&
                      !responses[currentStepData.type as keyof typeof responses]) ||
                    (["gratitude", "challenges", "goals"].includes(currentStepData.type) &&
                      !(responses[currentStepData.type as keyof typeof responses] as string)?.trim())
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Encouragement */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <p className="text-sm">
                Taking time for daily check-ins is a powerful step toward better mental health. You're doing great!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
