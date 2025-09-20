"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export function CrisisResources() {
  const resources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support",
      icon: Phone,
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support",
      icon: MessageCircle,
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
      icon: Phone,
    },
  ]

  return (
    <Card className="border-destructive bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Crisis Support Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          If you're having thoughts of self-harm or suicide, please reach out for help immediately:
        </p>
        {resources.map((resource, index) => {
          const Icon = resource.icon
          return (
            <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <Icon className="h-4 w-4 text-destructive" />
              <div className="flex-1">
                <p className="font-medium text-sm">{resource.name}</p>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (resource.number.includes("Text")) {
                    window.open("sms:741741?body=HOME", "_blank")
                  } else {
                    window.open(`tel:${resource.number.replace(/\D/g, "")}`, "_blank")
                  }
                }}
              >
                {resource.number.includes("Text") ? "Text" : "Call"}
              </Button>
            </div>
          )
        })}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            Remember: You are not alone, and your life has value. These feelings can change with proper support and
            treatment.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
