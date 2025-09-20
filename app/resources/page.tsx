"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageCircle, Globe, Heart, ArrowLeft, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "phone",
      urgent: true,
    },
    {
      name: "Crisis Text Line",
      contact: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      type: "text",
      urgent: true,
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse treatment referrals",
      type: "phone",
      urgent: false,
    },
    {
      name: "The Trevor Project",
      number: "1-866-488-7386",
      description: "Crisis support for LGBTQ+ youth",
      type: "phone",
      urgent: true,
    },
  ]

  const mentalHealthResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      website: "nami.org",
      description: "Mental health education, support groups, and advocacy",
    },
    {
      name: "Mental Health America",
      website: "mhanational.org",
      description: "Mental health screening tools and resources",
    },
    {
      name: "Anxiety and Depression Association",
      website: "adaa.org",
      description: "Information and resources for anxiety and depression",
    },
    {
      name: "JED Campus",
      website: "jedcampus.org",
      description: "Mental health resources for college students",
    },
  ]

  const selfCareResources = [
    {
      title: "Mindfulness & Meditation",
      items: ["Headspace", "Calm", "Insight Timer", "Ten Percent Happier"],
    },
    {
      title: "Physical Wellness",
      items: ["Regular exercise", "Healthy sleep habits", "Nutritious eating", "Time in nature"],
    },
    {
      title: "Social Connection",
      items: ["Trusted friends/family", "Support groups", "Community activities", "Volunteer work"],
    },
    {
      title: "Professional Help",
      items: ["Therapists", "Counselors", "Psychiatrists", "School counselors"],
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
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Crisis Support & Resources</h1>
                <p className="text-sm text-muted-foreground">Help is always available</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Banner */}
        <div className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-destructive/20 rounded-full">
              <Phone className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-destructive mb-2">In Crisis? Get Help Now</h2>
              <p className="text-muted-foreground mb-4">
                If you're having thoughts of self-harm or suicide, please reach out immediately. Help is available 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="destructive"
                  onClick={() => window.open("tel:988", "_blank")}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call 988
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("sms:741741?body=HOME", "_blank")}
                  className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Text HOME to 741741
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crisis Resources */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Phone className="h-6 w-6 text-destructive" />
                Crisis Hotlines
              </h2>
              <div className="grid gap-4">
                {crisisResources.map((resource, index) => (
                  <Card key={index} className={resource.urgent ? "border-destructive/30" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{resource.name}</CardTitle>
                          <p className="text-muted-foreground mt-1">{resource.description}</p>
                        </div>
                        {resource.urgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {resource.type === "phone" ? (
                            <Phone className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-mono text-lg">{resource.number || resource.contact}</span>
                        </div>
                        <Button
                          variant={resource.urgent ? "destructive" : "outline"}
                          onClick={() => {
                            if (resource.type === "phone") {
                              window.open(`tel:${resource.number?.replace(/\D/g, "")}`, "_blank")
                            } else {
                              window.open("sms:741741?body=HOME", "_blank")
                            }
                          }}
                        >
                          {resource.type === "phone" ? "Call Now" : "Text Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Mental Health Organizations
              </h2>
              <div className="grid gap-4">
                {mentalHealthResources.map((resource, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-primary">{resource.website}</span>
                        </div>
                        <Button variant="outline" onClick={() => window.open(`https://${resource.website}`, "_blank")}>
                          Visit Site
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Self-Care Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Self-Care Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selfCareResources.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{category.title}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Reminders */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>• You are not alone in this journey</p>
                  <p>• Seeking help is a sign of strength</p>
                  <p>• Your feelings are valid and temporary</p>
                  <p>• Recovery is possible with support</p>
                  <p>• Small steps lead to big changes</p>
                </div>
              </CardContent>
            </Card>

            {/* 24/7 Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available 24/7
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Crisis support is available around the clock. Don't hesitate to reach out, no matter the time.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/chat">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with AI Companion
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
