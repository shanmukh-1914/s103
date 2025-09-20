export interface CrisisIndicators {
  severity: "low" | "medium" | "high" | "critical"
  keywords: string[]
  confidence: number
  recommendedAction: string
}

export const crisisKeywords = {
  critical: [
    "kill myself",
    "end my life",
    "suicide",
    "want to die",
    "better off dead",
    "no point living",
    "planning to hurt myself",
    "have a plan",
  ],
  high: [
    "self harm",
    "cut myself",
    "hurt myself",
    "worthless",
    "hopeless",
    "can't go on",
    "give up",
    "burden",
    "everyone hates me",
  ],
  medium: [
    "depressed",
    "anxious",
    "overwhelmed",
    "stressed",
    "can't cope",
    "falling apart",
    "breaking down",
    "exhausted",
  ],
  low: ["sad", "worried", "tired", "upset", "frustrated", "angry", "confused"],
}

export function analyzeCrisisLevel(message: string): CrisisIndicators {
  const lowerMessage = message.toLowerCase()
  let severity: CrisisIndicators["severity"] = "low"
  const matchedKeywords: string[] = []
  let confidence = 0

  // Check for critical indicators
  for (const keyword of crisisKeywords.critical) {
    if (lowerMessage.includes(keyword)) {
      severity = "critical"
      matchedKeywords.push(keyword)
      confidence += 0.9
    }
  }

  // Check for high-risk indicators
  if (severity !== "critical") {
    for (const keyword of crisisKeywords.high) {
      if (lowerMessage.includes(keyword)) {
        severity = "high"
        matchedKeywords.push(keyword)
        confidence += 0.7
      }
    }
  }

  // Check for medium-risk indicators
  if (severity === "low") {
    for (const keyword of crisisKeywords.medium) {
      if (lowerMessage.includes(keyword)) {
        severity = "medium"
        matchedKeywords.push(keyword)
        confidence += 0.4
      }
    }
  }

  // Normalize confidence score
  confidence = Math.min(confidence, 1.0)

  let recommendedAction = ""
  switch (severity) {
    case "critical":
      recommendedAction = "immediate_intervention"
      break
    case "high":
      recommendedAction = "urgent_support"
      break
    case "medium":
      recommendedAction = "enhanced_monitoring"
      break
    case "low":
      recommendedAction = "standard_support"
      break
  }

  return {
    severity,
    keywords: matchedKeywords,
    confidence,
    recommendedAction,
  }
}

export function generateCrisisResponse(indicators: CrisisIndicators): string {
  switch (indicators.severity) {
    case "critical":
      return "I'm very concerned about what you've shared. Your safety is the most important thing right now. Please reach out to a crisis helpline immediately at 988 or text HOME to 741741. If you're in immediate danger, please call 911. You don't have to go through this alone - help is available."

    case "high":
      return "I can hear that you're going through a really difficult time right now. These feelings are serious, and I want to make sure you get the support you need. Please consider reaching out to a crisis helpline at 988 or talking to a trusted adult. Would you like me to provide some crisis support resources?"

    case "medium":
      return "It sounds like you're dealing with some challenging feelings right now. That takes courage to share. While these feelings are difficult, there are ways to work through them. Would you like to talk about some coping strategies, or would you prefer information about professional support resources?"

    case "low":
    default:
      return "I hear that you're going through a tough time. It's completely normal to have these feelings, and I'm here to support you. Would you like to talk about what's been on your mind, or explore some strategies that might help you feel better?"
  }
}
