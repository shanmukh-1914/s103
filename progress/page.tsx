"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  ArrowLeft,
  Calendar,
  Target,
  Moon,
  MessageCircle,
  BookOpen,
  Award,
  BarChart3,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  // Mock data for demonstration
  const wellnessData = [
    { date: "Mon", mood: 7, energy: 6, sleep: 8, stress: 4 },
    { date: "Tue", mood: 6, energy: 7, sleep: 7, stress: 5 },
    { date: "Wed", mood: 8, energy: 8, sleep: 6, stress: 3 },
    { date: "Thu", mood: 7, energy: 6, sleep: 8, stress: 4 },
    { date: "Fri", mood: 9, energy: 9, sleep: 7, stress: 2 },
    { date: "Sat", mood: 8, energy: 7, sleep: 9, stress: 3 },
    { date: "Sun", mood: 7, energy: 6, sleep: 8, stress: 4 },
  ]

  const activityData = [
    { activity: "AI Chat", sessions: 12, avgDuration: 15 },
    { activity: "Sleep Coach", sessions: 7, avgDuration: 8 },
    { activity: "Micro-Coaching", sessions: 5, avgDuration: 12 },
    { activity: "Progress Review", sessions: 2, avgDuration: 20 },
  ]

  const achievements = [
    {
      title: "7-Day Streak",
      description: "Completed daily check-ins for a week",
      icon: Zap,
      earned: true,
      date: "2 days ago",
    },
    {
      title: "Sleep Champion",
      description: "Maintained healthy sleep schedule",
      icon: Moon,
      earned: true,
      date: "1 week ago",
    },
    {
      title: "Conversation Starter",
      description: "Had 10 meaningful AI conversations",
      icon: MessageCircle,
      earned: true,
      date: "3 days ago",
    },
    {
      title: "Wellness Warrior",
      description: "Used all platform features",
      icon: Award,
      earned: false,
      date: null,
    },
  ]

  const weeklyInsights = [
    {
      metric: "Overall Wellness",
      value: 78,
      change: +5,
      trend: "up",
      description: "Your overall wellness score improved this week",
    },
    {
      metric: "Mood Stability",
      value: 85,
      change: +2,
      trend: "up",
      description: "More consistent mood patterns observed",
    },
    {
      metric: "Sleep Quality",
      value: 82,
      change: -3,
      trend: "down",
      description: "Sleep quality slightly decreased mid-week",
    },
    {
      metric: "Stress Management",
      value: 74,
      change: +8,
      trend: "up",
      description: "Significant improvement in stress levels",
    },
  ]

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
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Progress Tracking</h1>
                <p className="text-sm text-muted-foreground">Your wellness journey insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Wellness Journey</h2>
            <p className="text-muted-foreground">Track your progress and celebrate your achievements</p>
          </div>
          <div className="flex gap-2">
            {["week", "month", "quarter"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Insights */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {weeklyInsights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{insight.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold">{insight.value}%</span>
                      <div
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          insight.trend === "up"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                        }`}
                      >
                        <TrendingUp className={`h-3 w-3 ${insight.trend === "down" ? "rotate-180" : ""}`} />
                        {Math.abs(insight.change)}%
                      </div>
                    </div>
                    <Progress value={insight.value} className="h-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Wellness Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Wellness Trends</CardTitle>
                <CardDescription>Track your mood, energy, sleep, and stress levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wellnessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood" />
                      <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} name="Energy" />
                      <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} name="Sleep" />
                      <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Mood</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span>Energy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Sleep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Stress</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mood Patterns</CardTitle>
                  <CardDescription>Your emotional well-being over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wellnessData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sleep Quality</CardTitle>
                  <CardDescription>Your sleep patterns and quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wellnessData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="sleep" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Personalized observations about your wellness patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Positive Trend</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your mood has been consistently improving over the past week, with Friday showing your highest
                      score. This correlates with better sleep quality earlier in the week.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pattern Recognition</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your energy levels tend to be higher on weekends, suggesting that reduced academic or work stress
                      has a positive impact on your overall well-being.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Recommendation</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Consider maintaining your current sleep schedule as it appears to positively influence your mood
                      and stress levels. The sleep coach can help you optimize this further.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage</CardTitle>
                <CardDescription>How you've been engaging with different wellness tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {activity.activity === "AI Chat" && <MessageCircle className="h-5 w-5 text-primary" />}
                          {activity.activity === "Sleep Coach" && <Moon className="h-5 w-5 text-blue-600" />}
                          {activity.activity === "Micro-Coaching" && <BookOpen className="h-5 w-5 text-purple-600" />}
                          {activity.activity === "Progress Review" && <BarChart3 className="h-5 w-5 text-green-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.activity}</h3>
                          <p className="text-sm text-muted-foreground">
                            {activity.sessions} sessions • Avg {activity.avgDuration} min
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{activity.sessions}</div>
                        <div className="text-xs text-muted-foreground">sessions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                  <CardDescription>Your progress toward weekly wellness goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Daily Check-ins</span>
                        <span>6/7</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Conversations</span>
                        <span>12/10</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sleep Goals</span>
                        <span>5/7</span>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mindfulness Minutes</span>
                        <span>45/60</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Spent</CardTitle>
                  <CardDescription>How you've invested in your mental wellness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Total this week</span>
                      </div>
                      <span className="font-semibold">3h 45m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Daily average</span>
                      </div>
                      <span className="font-semibold">32m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">vs last week</span>
                      </div>
                      <span className="font-semibold text-green-600">+15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <Card key={index} className={achievement.earned ? "border-primary/50 bg-primary/5" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${achievement.earned ? "bg-primary/20" : "bg-muted"}`}>
                            <Icon
                              className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </div>
                        </div>
                        {achievement.earned ? (
                          <Badge className="bg-primary/20 text-primary">Earned</Badge>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>
                    </CardHeader>
                    {achievement.earned && achievement.date && (
                      <CardContent>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Earned {achievement.date}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
                <CardDescription>Your journey toward wellness milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Wellness Explorer</span>
                      <span>3/4 features used</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Try the micro-coaching feature to unlock this achievement
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Consistency Champion</span>
                      <span>12/14 days</span>
                    </div>
                    <Progress value={86} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete daily check-ins for 14 consecutive days
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Mindful Moments</span>
                      <span>180/300 minutes</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Spend 300 minutes in mindfulness activities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
