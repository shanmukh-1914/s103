"use client"

import type React from "react"

// Emoji regex from https://thekevinscott.com/emojis-in-javascript/
const emojiRegex = /([\u231A-\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD-\u25FE\u2614-\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA-\u26AB\u26BD-\u26BE\u26C4-\u26C5\u26CE\u26D4\u26EA\u26F2-\u26F3\u26F5\u26FA\u26FD\u2705\u270A-\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B-\u2B1C\u2B50\u2B55\u1F004\u1F0CF\u1F18E\u1F191-\u1F19A\u1F1E6-\u1F1FF\u1F201-\u1F202\u1F21A\u1F22F\u1F232-\u1F23A\u1F250-\u1F251\u1F300-\u1F321\u1F324-\u1F393\u1F396-\u1F397\u1F399-\u1F39B\u1F39E-\u1F3F0\u1F3F3-\u1F3F5\u1F3F7-\u1F4FD\u1F4FF-\u1F53D\u1F549-\u1F54E\u1F550-\u1F567\u1F56F-\u1F570\u1F573-\u1F57A\u1F587\u1F58A-\u1F58D\u1F590\u1F595-\u1F596\u1F5A4-\u1F5A5\u1F5A8\u1F5B1-\u1F5B2\u1F5BC\u1F5C2-\u1F5C4\u1F5D1-\u1F5D3\u1F5DC-\u1F5DE\u1F5E1\u1F5E3\u1F5E8\u1F5EF\u1F5F3\u1F5FA\u1F5FB-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6C5\u1F6CB-\u1F6D2\u1F6E0-\u1F6E5\u1F6E9\u1F6EB-\u1F6EC\u1F6F0\u1F6F3\u1F910-\u1F918\u1F919-\u1F91E\u1F920-\u1F927\u1F928-\u1F92F\u1F930\u1F933-\u1F93E\u1F940-\u1F94B\u1F950-\u1F95E\u1F980-\u1F991\u1F9C0\u1F9D0-\u1F9E6])/g;


// Helper to wrap emojis in a span for animation
function renderAnimatedEmojis(text: string): JSX.Element {
  return (
    <>
      {(text.split(emojiRegex) as string[]).map((part: string, i: number) =>
        emojiRegex.test(part) ? (
          <span className="animated-emoji" key={i}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CrisisAlert } from "@/components/crisis-alert"
import { MessageCircle, Send, ArrowLeft, Bot, User, AlertTriangle, Heart, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  isCrisis?: boolean
  crisisLevel?: "low" | "medium" | "high" | "critical"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentCrisisLevel, setCurrentCrisisLevel] = useState<"low" | "medium" | "high" | "critical" | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Optimistically show 'AI is typing...' immediately
    // (isLoading already triggers the typing indicator in UI)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: messages
            .slice(-5)
            .map((m) => `${m.sender}: ${m.content}`)
            .join("\n"),
        }),
      });

      const data = await response.json();

      // Update crisis level if detected
      if (data.crisisLevel && (data.crisisLevel === "high" || data.crisisLevel === "critical")) {
        setCurrentCrisisLevel(data.crisisLevel);
      }

      // Make AI response extra friendly and positive
      let aiContent = data.response;
      if (!data.isCrisis) {
        aiContent =
          "😊 " +
          aiContent.replace(/^(hi|hello|hey)[.!]?/i, "Hey there!") +
          "\n\nLet me know if you want to talk more or need a quick tip!";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        sender: "ai",
        timestamp: new Date(),
        isCrisis: data.isCrisis,
        crisisLevel: data.crisisLevel,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or reach out to a crisis helpline if you need immediate support.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  } 

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickResponses = [
    "I'm feeling anxious",
    "I'm having trouble sleeping",
    "I'm stressed about school",
    "I feel overwhelmed",
    "I need motivation",
    "I'm feeling lonely",
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">AI Companion</h1>
                  <p className="text-sm text-muted-foreground">Always here to listen</p>
                </div>
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

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Crisis Alert */}
        {currentCrisisLevel && (currentCrisisLevel === "high" || currentCrisisLevel === "critical") && (
          <div className="mb-6">
            <CrisisAlert
              severity={currentCrisisLevel}
              onDismiss={() => setCurrentCrisisLevel(null)}
              showDismiss={currentCrisisLevel !== "critical"}
            />
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 mb-6">
          <ScrollArea className="h-[60vh]" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "ai" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : message.isCrisis
                          ? "bg-destructive/10 border border-destructive/20"
                          : "bg-muted"
                    }`}
                  >
                    {message.isCrisis && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <Badge variant="destructive" className="text-xs">
                          {message.crisisLevel === "critical" ? "Critical Support" : "Crisis Detected"}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.sender === "ai"
                        ? renderAnimatedEmojis(message.content)
                        : message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-secondary" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3 animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/40 rounded-full" />
                      <div className="w-2 h-2 bg-primary/30 rounded-full" />
                      <div className="w-2 h-2 bg-primary/20 rounded-full" />
                    </div>
                    <div className="h-4 w-32 bg-muted/40 rounded mt-2" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Quick Responses */}
        {messages.length <= 2 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3">Quick responses to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(response)}
                  className="text-xs"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex gap-3">
            {isLoading ? (
              <div className="flex-1 animate-pulse h-10 bg-muted/40 rounded" />
            ) : (
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1"
                disabled={isLoading}
              />
            )}
            <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Heart className="h-3 w-3" />
              <span>Your conversations are private and secure</span>
            </div>
            <span>Press Enter to send</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            This AI companion provides support and guidance but is not a replacement for professional mental health
            treatment. If you're experiencing a crisis, please contact emergency services or a crisis helpline
            immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
