import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDMlb8Z4PD-MVHcXOCpm0LD4iENJv6r0j0")

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

export async function generateResponse(prompt: string, context?: string) {
  try {
  const systemPrompt = `You are Sam, a friendly and supportive AI companion. Always respond with warmth, encouragement, and use emojis naturally. Make the user feel heard and supported, like a real friend would. Keep responses casual, positive, and never judgmental. Vary your greetings and supportive phrases—do not repeat the same wording or call the user 'sweet friend' every time. Each response should feel fresh and unique, as if you are chatting in real life.`
    const fullPrompt = context
      ? `${systemPrompt}\n\nContext: ${context}\n\nUser: ${prompt}`
      : `${systemPrompt}\n\nUser: ${prompt}`

    const result = await geminiModel.generateContent(fullPrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating response:", error)
    return "I'm here to help, but I'm having trouble connecting right now. Please try again in a moment, or reach out to a trusted adult or crisis helpline if you need immediate support."
  }
}

export async function detectCrisis(message: string): Promise<boolean> {
  try {
    const prompt = `Analyze this message for signs of mental health crisis, self-harm, or suicidal ideation. Respond with only "CRISIS" or "SAFE":

Message: "${message}"

Look for indicators like:
- Direct mentions of self-harm or suicide
- Expressions of hopelessness or wanting to give up
- Mentions of having a plan to hurt oneself
- Feeling like a burden or that others would be better off without them
- Extreme emotional distress or desperation`

    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim().toUpperCase()

    return text.includes("CRISIS")
  } catch (error) {
    console.error("Error in crisis detection:", error)
    // Err on the side of caution
    return false
  }
}
