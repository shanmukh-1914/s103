"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Target,
  Brain,
  Heart,
  Zap,
  CheckCircle,
  Play,
  RotateCcw,
  GraduationCap,
  Briefcase,
  Users,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function MicroCoachingPage() {
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [sessionProgress, setSessionProgress] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [aiMessage, setAiMessage] = useState<string | null>(null)

  const coachingCategories = [
    {
      id: "academic",
      title: "Academic Stress",
      description: "Manage study pressure, exam anxiety, and academic overwhelm",
      icon: GraduationCap,
      color: "bg-blue-500/10 text-blue-600",
      sessions: 8,
    },
    {
      id: "career",
      title: "Career Anxiety",
      description: "Navigate job searches, interviews, and career decisions",
      icon: Briefcase,
      color: "bg-green-500/10 text-green-600",
      sessions: 6,
    },
    {
      id: "social",
      title: "Social Situations",
      description: "Build confidence in social interactions and relationships",
      icon: Users,
      color: "bg-purple-500/10 text-purple-600",
      sessions: 7,
    },
    {
      id: "daily",
      title: "Daily Stress",
      description: "Quick techniques for everyday challenges and overwhelm",
      icon: Home,
      color: "bg-orange-500/10 text-orange-600",
      sessions: 10,
    },
  ]

  const quickTechniques = [
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      description: "Calm your nervous system in under 2 minutes",
      duration: "2 min",
      icon: Heart,
      steps: [
        "Exhale completely through your mouth",
        "Close your mouth and inhale through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through your mouth for 8 counts",
        "Repeat 3-4 times",
      ],
    },
    {
      id: "grounding",
      title: "5-4-3-2-1 Grounding",
      description: "Ground yourself when feeling overwhelmed or anxious",
      duration: "3 min",
      icon: Brain,
      steps: [
        "Name 5 things you can see",
        "Name 4 things you can touch",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste",
      ],
    },
    {
      id: "energy",
      title: "Quick Energy Reset",
      description: "Boost your energy and focus when feeling drained",
      duration: "5 min",
      icon: Zap,
      steps: [
        "Stand up and stretch your arms overhead",
        "Take 5 deep breaths while stretching",
        "Do 10 jumping jacks or march in place",
        "Drink a glass of water",
        "Set one small, achievable goal for the next hour",
      ],
    },
  ]

  const academicSessions = [
    {
      id: "exam-prep",
      title: "Exam Preparation Anxiety",
      description: "Strategies to manage pre-exam stress and improve focus",
      duration: "8 min",
      difficulty: "Beginner",
    },
    {
      id: "procrastination",
      title: "Overcoming Procrastination",
      description: "Break the cycle of avoidance and build momentum",
      duration: "10 min",
      difficulty: "Intermediate",
    },
    {
      id: "perfectionism",
      title: "Managing Perfectionism",
      description: "Find balance between high standards and self-compassion",
      duration: "12 min",
      difficulty: "Advanced",
    },
  ]

  const startQuickTechnique = (techniqueId: string) => {
    setActiveSession(techniqueId)
    setSessionProgress(0)
    setIsSessionActive(true)
    setAiMessage(null)

    // Simulate progress
    const interval = setInterval(() => {
      setSessionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSessionActive(false)
          // Show friendly AI message after completion
          setTimeout(() => {
            setAiMessage("🎉 Awesome job! You completed this technique. Remember, every small step counts. If you want to talk or need more tips, I'm always here for you!");
          }, 500);
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const resetSession = () => {
    setActiveSession(null)
    setSessionProgress(0)
    setIsSessionActive(false)
    setAiMessage(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Micro-Coaching</h1>
                <p className="text-sm text-muted-foreground">Quick, targeted support for daily challenges</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Techniques Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Quick Relief Techniques</h2>
            <p className="text-muted-foreground">Immediate strategies you can use anywhere, anytime</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickTechniques.map((technique) => {
              const Icon = technique.icon
              const isActive = activeSession === technique.id

              return (
                <Card key={technique.id} className={isActive ? "border-primary bg-primary/5" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{technique.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {technique.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isActive ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{sessionProgress}%</span>
                          </div>
                          <Progress value={sessionProgress} className="h-2" />
                        </div>

                        {sessionProgress < 100 ? (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Follow these steps:</h4>
                            <ol className="text-sm space-y-1">
                              {technique.steps.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-primary font-medium">{index + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                            <p className="text-sm font-medium text-green-600">Technique completed!</p>
                            <p className="text-xs text-muted-foreground">How do you feel now?</p>
                            {aiMessage && (
                              <div className="mt-3 p-3 bg-blue-50 rounded text-blue-700 animate-fade-in">
                                {aiMessage}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetSession}
                            className="flex-1 bg-transparent"
                            disabled={isSessionActive}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                          {sessionProgress === 100 && (
                            <Button size="sm" className="flex-1" asChild>
                              <Link href="/chat">Share Experience</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => startQuickTechnique(technique.id)} className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Start Technique
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Coaching Categories */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Targeted Coaching</h2>
            <p className="text-muted-foreground">Specialized support for specific life challenges</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachingCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`p-3 rounded-lg w-fit mb-2 ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{category.sessions} sessions</span>
                      <Button size="sm" variant="outline">
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Featured Sessions */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Featured Sessions</h2>
            <p className="text-muted-foreground">Popular coaching sessions for academic and career stress</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {academicSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription className="mt-2">{session.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {session.duration}
                    </div>
                    <Badge variant={session.difficulty === "Beginner" ? "secondary" : "outline"} className="text-xs">
                      {session.difficulty}
                    </Badge>
                  </div>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Today's Micro-Challenge</CardTitle>
                  <CardDescription>A small step toward better mental wellness</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg font-medium">
                  Practice the "Two-Minute Rule" - If a task takes less than 2 minutes, do it now instead of putting it
                  off.
                </p>
                <p className="text-sm text-muted-foreground">
                  This simple technique can reduce mental clutter and build momentum for larger tasks. Try it with small
                  items on your to-do list today.
                </p>
                <div className="flex gap-3">
                  <Button>Accept Challenge</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
