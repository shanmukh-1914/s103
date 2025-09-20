

import { type NextRequest, NextResponse } from "next/server"
import { generateResponse, detectCrisis } from "@/lib/gemini"
import { analyzeCrisisLevel, generateCrisisResponse } from "@/lib/crisis-detection"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Enhanced crisis detection with multiple layers
    const crisisAnalysis = analyzeCrisisLevel(message)

    // Run Gemini crisis check and logging in parallel
    const [geminiCrisisCheck] = await Promise.all([
      detectCrisis(message),
      (async () => {
        if (crisisAnalysis.severity !== "low") {
          try {
            await fetch(`${request.nextUrl.origin}/api/crisis-log`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                severity: crisisAnalysis.severity,
                message: message.substring(0, 100), // Log only first 100 chars for privacy
                keywords: crisisAnalysis.keywords,
                confidence: crisisAnalysis.confidence,
                actionTaken: crisisAnalysis.recommendedAction,
                timestamp: new Date().toISOString(),
              }),
            })
          } catch (logError) {
            console.error("Failed to log crisis event:", logError)
          }
        }
      })(),
    ])

    // Determine if this is a crisis situation
    const isCrisis = geminiCrisisCheck || crisisAnalysis.severity === "high" || crisisAnalysis.severity === "critical"

    // --- Type-safe in-memory cache for AI responses ---
    // (For demo: cache last 50 responses by message+context)
    // Type-safe in-memory cache for AI responses
    // (For demo: cache last 50 responses by message+context)
    // @ts-ignore
    if (!globalThis.__aiResponseCache) {
      // @ts-ignore
      globalThis.__aiResponseCache = new Map();
    }
    const cacheKey = `${message}|${context || ""}`;
    let response: string;
    // @ts-ignore
    if (!isCrisis && globalThis.__aiResponseCache.has(cacheKey)) {
      // @ts-ignore
      response = globalThis.__aiResponseCache.get(cacheKey) as string;
    } else if (isCrisis) {
      response = generateCrisisResponse(crisisAnalysis);
    } else {
      response = await generateResponse(message, context);
      // @ts-ignore
      globalThis.__aiResponseCache.set(cacheKey, response);
      // Limit cache size
      // @ts-ignore
      if (globalThis.__aiResponseCache.size > 50) {
        // @ts-ignore
        const firstKey = globalThis.__aiResponseCache.keys().next().value;
        if (typeof firstKey === "string") {
          // @ts-ignore
          globalThis.__aiResponseCache.delete(firstKey);
        }
      }
    }

    return NextResponse.json({
      response,
      isCrisis,
      crisisLevel: crisisAnalysis.severity,
      confidence: crisisAnalysis.confidence,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
