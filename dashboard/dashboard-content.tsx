"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Moon, TrendingUp, BookOpen, Heart, Calendar, Clock, Target, Zap, Shield } from "lucide-react";
import Link from "next/link";

const DashboardContent = React.memo(function DashboardContent({ user, userData }: { user: any, userData: any }) {
  // Use userData for dashboard values
  const wellnessScore = userData?.wellnessScore ?? 70;
  const streakDays = userData?.streakDays ?? 0;
  const todayGoals: { id: number; title: string; completed: boolean }[] = userData?.todayGoals ? JSON.parse(userData.todayGoals) : [];
  const recentActivities: { type: string; title: string; time: string }[] = userData?.recentActivities ? JSON.parse(userData.recentActivities) : [];
  const quickActions = [
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "Chat with your AI wellness companion",
      href: "/chat",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Moon,
      title: "Sleep Coach",
      description: "Improve your sleep quality",
      href: "/sleep-coach",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: BookOpen,
      title: "Micro-Coaching",
      description: "Quick stress relief techniques",
      href: "/micro-coaching",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Progress",
      description: "View your wellness journey",
      href: "/progress",
      color: "bg-green-500/10 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">ManasMitra</h1>
                <p className="text-sm text-muted-foreground">Your wellness dashboard</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/resources">
                <Shield className="h-4 w-4 mr-2" />
                Crisis Support
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name || user.email}!</h2>
          <p className="text-muted-foreground">
            Here's how you're doing today. Remember, every small step counts toward your wellbeing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wellness Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="transition-shadow duration-200 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Wellness Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-primary">{wellnessScore}%</div>
                    <div className="flex-1">
                      <Progress value={wellnessScore} className="h-2" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
                </CardContent>
              </Card>

              <Card className="transition-shadow duration-200 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <span className="text-2xl font-bold">{streakDays}</span>
                    <span className="text-muted-foreground">days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
                </CardContent>
              </Card>

              <Card className="transition-shadow duration-200 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">
                      {todayGoals.filter((g: { completed: boolean }) => g.completed).length}/{todayGoals.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Goals completed</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into your wellness activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link key={index} href={action.href}>
                        <div
                          className="p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-md focus:bg-muted/40 active:scale-[0.98]"
                          tabIndex={0}
                          role="button"
                          aria-label={action.title}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{action.title}</h3>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Today's Goals */}
            <Card className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle>Today's Goals</CardTitle>
                <CardDescription>Small steps toward better mental health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayGoals.map((goal: { id: number; title: string; completed: boolean }) => (
                    <div
                      key={goal.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 transition-colors duration-150 hover:bg-muted/50"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          goal.completed
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30 hover:border-primary"
                        } cursor-pointer transition-colors`}
                      />
                      <span className={`flex-1 ${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                        {goal.title}
                      </span>
                      {goal.completed && <Badge variant="secondary">Done</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity: { type: string; title: string; time: string }, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-1.5 bg-primary/10 rounded-full mt-0.5">
                        {activity.type === "chat" && <MessageCircle className="h-3 w-3 text-primary" />}
                        {activity.type === "sleep" && <Moon className="h-3 w-3 text-blue-600" />}
                        {activity.type === "coaching" && <BookOpen className="h-3 w-3 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Check-in */}
            <Card className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Daily Check-in</CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/check-in">
                      <Calendar className="h-4 w-4 mr-2" />
                      Start Check-in
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Take 2 minutes to reflect on your mood and energy levels.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Resources */}
            <Card className="border-destructive/20 bg-destructive/5 transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">Need Help Now?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full" asChild>
                    <Link href="/resources">
                      <Shield className="h-4 w-4 mr-2" />
                      Crisis Resources
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">24/7 support is available. You're not alone.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DashboardContent;
