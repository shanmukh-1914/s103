import { type NextRequest, NextResponse } from "next/server"

interface CrisisLog {
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  keywords: string[]
  confidence: number
  actionTaken: string
  userId?: string
}

// In a real application, this would be stored in a secure database
const crisisLogs: CrisisLog[] = []

export async function POST(request: NextRequest) {
  try {
    const logEntry: CrisisLog = await request.json()

    // Add timestamp if not provided
    if (!logEntry.timestamp) {
      logEntry.timestamp = new Date().toISOString()
    }

    // Store the log entry (in production, this would go to a secure database)
    crisisLogs.push(logEntry)

    // For critical cases, you might want to trigger additional alerts
    if (logEntry.severity === "critical") {
      console.log("CRITICAL CRISIS EVENT LOGGED:", {
        timestamp: logEntry.timestamp,
        severity: logEntry.severity,
        confidence: logEntry.confidence,
      })
      // In production, this could trigger notifications to crisis counselors
    }

    return NextResponse.json({ success: true, logId: crisisLogs.length })
  } catch (error) {
    console.error("Error logging crisis event:", error)
    return NextResponse.json({ error: "Failed to log crisis event" }, { status: 500 })
  }
}

export async function GET() {
  // This endpoint would typically require admin authentication
  // For demo purposes, we'll return anonymized statistics
  const stats = {
    totalLogs: crisisLogs.length,
    severityBreakdown: {
      critical: crisisLogs.filter((log) => log.severity === "critical").length,
      high: crisisLogs.filter((log) => log.severity === "high").length,
      medium: crisisLogs.filter((log) => log.severity === "medium").length,
      low: crisisLogs.filter((log) => log.severity === "low").length,
    },
    last24Hours: crisisLogs.filter(
      (log) => new Date().getTime() - new Date(log.timestamp).getTime() < 24 * 60 * 60 * 1000,
    ).length,
  }

  return NextResponse.json(stats)
}
