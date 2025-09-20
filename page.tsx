import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Clock, Users, MessageCircle, Moon, TrendingUp, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "24/7 empathetic AI support designed specifically for youth mental wellness",
    },
    {
      icon: Moon,
      title: "Sleep Coach",
      description: "Personalized sleep optimization guidance to improve your mental health",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Weekly wellness reports and insights to track your mental health journey",
    },
    {
      icon: BookOpen,
      title: "Micro-Coaching",
      description: "Targeted support for academic stress, career anxiety, and daily challenges",
    },
    {
      icon: Shield,
      title: "Crisis Detection",
      description: "Real-time safety monitoring with immediate access to professional resources",
    },
    {
      icon: Users,
      title: "Resource Hub",
      description: "Curated mental health resources, helplines, and professional support options",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Your Mental Wellness,
            <span className="text-primary"> Reimagined</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            A confidential, AI-powered platform designed specifically for youth ages 13-25. Get personalized support,
            track your progress, and access resources—all in a safe, judgment-free space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/signin">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/resources">Crisis Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Mental Wellness Tools</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to support your mental health journey, designed with privacy and empathy at the core.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6">Your Privacy & Safety Come First</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                24/7 Availability
              </h3>
              <p className="text-muted-foreground">
                Access support whenever you need it, day or night, without appointments or waiting lists.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Complete Confidentiality
              </h3>
              <p className="text-muted-foreground">
                End-to-end encryption and anonymous usage options ensure your conversations stay private.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Stigma-Free Support
              </h3>
              <p className="text-muted-foreground">
                No judgment, no labels—just compassionate support tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the First Step?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of young people who have found support, guidance, and hope through ManasMitra.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/dashboard">Get Started Today</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">Free to use • No credit card required • Complete privacy</p>
        </div>
      </section>
    </div>
  )
}
