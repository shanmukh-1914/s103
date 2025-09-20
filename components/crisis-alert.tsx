"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MessageCircle, X, Heart, Shield } from "lucide-react"

interface CrisisAlertProps {
  severity: "low" | "medium" | "high" | "critical"
  onDismiss?: () => void
  showDismiss?: boolean
}

export function CrisisAlert({ severity, onDismiss, showDismiss = true }: CrisisAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const getAlertConfig = () => {
    switch (severity) {
      case "critical":
        return {
          title: "Immediate Support Needed",
          description: "We're concerned about your safety. Please reach out for help right now.",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          borderColor: "border-red-200 dark:border-red-800",
          textColor: "text-red-800 dark:text-red-200",
          badgeVariant: "destructive" as const,
          urgency: "URGENT",
        }
      case "high":
        return {
          title: "Crisis Support Available",
          description: "You're going through something difficult. Professional help is available 24/7.",
          bgColor: "bg-orange-50 dark:bg-orange-950/20",
          borderColor: "border-orange-200 dark:border-orange-800",
          textColor: "text-orange-800 dark:text-orange-200",
          badgeVariant: "destructive" as const,
          urgency: "HIGH PRIORITY",
        }
      case "medium":
        return {
          title: "Support Resources",
          description: "It sounds like you could use some extra support right now.",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          textColor: "text-yellow-800 dark:text-yellow-200",
          badgeVariant: "secondary" as const,
          urgency: "SUPPORT AVAILABLE",
        }
      default:
        return {
          title: "We're Here for You",
          description: "Remember that support is always available when you need it.",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-200",
          badgeVariant: "secondary" as const,
          urgency: "INFO",
        }
    }
  }

  const config = getAlertConfig()

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/50 dark:bg-black/20 rounded-full">
              {severity === "critical" || severity === "high" ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <Heart className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className={`text-lg ${config.textColor}`}>{config.title}</CardTitle>
              <Badge variant={config.badgeVariant} className="mt-1 text-xs">
                {config.urgency}
              </Badge>
            </div>
          </div>
          {showDismiss && (
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`mb-4 ${config.textColor}`}>{config.description}</p>

        <div className="space-y-3">
          {(severity === "critical" || severity === "high") && (
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="destructive" className="flex-1" onClick={() => window.open("tel:988", "_blank")}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call 988 - Crisis Lifeline
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  onClick={() => window.open("sms:741741?body=HOME", "_blank")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Text HOME to 741741
                </Button>
              </div>
              {severity === "critical" && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    If you're in immediate physical danger, please call 911 or go to your nearest emergency room.
                  </p>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => window.open("/resources", "_blank")}
            >
              <Shield className="h-4 w-4 mr-2" />
              View All Resources
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.open("/chat", "_blank")}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Continue Chatting
            </Button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Remember:</strong> You are not alone. These feelings can change with proper support. Crisis
            counselors are trained to help and available 24/7.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
